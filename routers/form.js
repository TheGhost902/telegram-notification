const express = require('express');
const Db = require('../modules/db');
const sendToTelegram = require('../modules/telegram');
const router = express.Router();

Db.connect('mongodb://localhost:27017','form_app_db','form_requests');

router.post('/form', (req, res) => {
    const data = {
        ...req.body,
        time: new Date().toString()
    };

    Db.addOne(data)
        .then((id) => {
            console.log(`---- get new user: ${data.name}, id: ${id} ----`);
            res.end(`${data.name}, all is good!`);

            sendToTelegram(`new request: ${data.name} ${data.number} at ${data.time}`)
                .then(() => {console.log('TELEGRAM message was sended')})
                .catch((err) => {console.log('TELEGRAM', err)});
        }).catch((err) => {
            console.log('!!! Error: cant add user !!!');
            console.log(err);
            res.status(500).send('Some server error...');
        });
});

process.on('SIGINT', () => {
    Db.close();
    process.exit();
});

module.exports = router;