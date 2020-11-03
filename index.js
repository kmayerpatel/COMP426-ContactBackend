const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Contact = require('./contact.js');

app.get('/contacts', (req, res) => {
    let answer = Contact.findAll();

    if (req.query.jsonp) {
        res.send(req.query.jsonp + "(" + JSON.stringify(answer) + ");");
    } else {
        res.json(Contact.findAll());
    }
});

app.get('/contacts/:id', (req, res) => {
    let contact = Contact.find(req.params.id);
    if (contact === undefined) {
        res.status(404).send("No such contact with id = " + req.params.id);
    } else {
        res.json(contact);
    }
});

app.post('/contacts', (req, res) => {
    let {first, last, email, phone, notes} = req.body;
    let contact = Contact.create(first, last, email, phone, notes);
    if (contact === undefined) {
        res.status(500).send("Server error, contact not created");
    } else {
        res.json(contact);
    }
});

app.post('/contacts/:id', (req, res) => {
    let contact = Contact.find(req.params.id);
    if (contact === undefined) {
        res.status(404).send("No such contact with id = " + req.params.id);
    } else {
        let {first, last, email, phone, notes} = req.body;
        contact.first = first;
        contact.last = last;
        contact.email = email;
        contact.phone = phone;
        contact.notes = notes;

        res.json(contact);
    }
});

app.delete('/contacts/:id', (req, res) => {
    Contact.delete(req.params.id);
    res.json(true);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Example app listening on port: ' + port);
})