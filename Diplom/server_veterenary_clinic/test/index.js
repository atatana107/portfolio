import express from 'express';
import parser from 'body-parser';

/*
 * Первый сервер, localhost:7777
 */
const appOne = express();
appOne.use(parser.json());
appOne.get('/', (req, res) => res.send('Server one'));
// GET-запрос
appOne.get('/get', (req, res) => res.send('Method GET, server one'));
// POST-запрос
appOne.post('/post', (req, res) => {
    if (Object.keys(req.body).length > 0) {
        res.json({
            method: 'POST',
            server: 'one',
            body: req.body
        });
    } else {
        res.json({
            method: 'POST',
            server: 'one',
            body: 'empty'
        });
    }
});
// Authorization
appOne.get('/auth', (req, res) => {
    if (req.headers.authorization && req.headers.authorization === 'api-key-one') {
        res.send('Auth success, server one');
    } else {
        res.status(401).send();
    }
});
appOne.listen(7777);

/*
 * Второй сервер, localhost:8888
 */
const appTwo = express();
appTwo.use(parser.json());
appTwo.get('/', (req, res) => res.send('Server two'));
// GET-запрос
appTwo.get('/get', (req, res) => res.send('Method GET, server two'));
// POST-запрос
appTwo.post('/post', (req, res) => {
    if (Object.keys(req.body).length > 0) {
        res.json({
            method: 'POST',
            server: 'two',
            body: req.body
        });
    } else {
        res.json({
            method: 'POST',
            server: 'two',
            body: 'empty'
        });
    }
});
// Authorization
appTwo.get('/auth', (req, res) => {
    if (req.headers.authorization && req.headers.authorization === 'api-key-two') {
        res.send('Auth success, server two');
    } else {
        res.status(401).send();
    }
});
appTwo.listen(8888);