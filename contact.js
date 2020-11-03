class Contact {

    constructor(id, first, last, email, phone, notes) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.email = email;
        this.phone = phone;
        this.notes = notes;
    }

    update() {
        database.set('contacts.'+this.id, this);
    }
}

let database = require('data-store')({path: process.cwd() + '/data/contacts.json'});

let first_time = false;
if (!database.has('contacts')) {
    database.set('contacts', {});
    first_time = true;
}

Contact.findAll = () => {
    return Object.keys(database.get('contacts')).map((cid) => {return parseInt(cid)});
};

Contact.find = (id) => {
    return database.get('contacts.'+id);
}

Contact.next_id = 1 + Contact.findAll().reduce((max_id, cid) => {
    if (cid > max_id) {
        return cid;
    } else {
        return max_id;
    }
}, 0);

Contact.create = (first, last, email, phone, notes) => {
    console.log("Creating new contact with id: " + Contact.next_id);
    let result = new Contact(Contact.next_id, first, last, email, phone, notes);
    database.set('contacts.'+result.id, result);
    Contact.next_id += 1;
    return result;
}

Contact.delete = (id) => {
    database.del('contacts.'+id);
}

// Hardcode some initial contacts.

if (first_time) {
    console.log("Populating contacts on first time.");
    Contact.create("John", "Doe", "john_doe@email.unc.edu", "919-867-5309", "Notes: sdfjkl");
    Contact.create("Sally", "Walters", "sally_walters@email.unc.edu", "919-867-5309", "Notes: affsdasd");
    Contact.create("Rajan", "Shah", "rajan_shah@email.unc.edu", "919-867-5309", "Notes: gjfkls");
    Contact.create("Anita", "Rao", "anita_rao@email.unc.edu", "919-867-5309", "Notes: f sdhjfsjh");
    Contact.create("Sejal", "Patel", "sejal_patel@email.unc.edu", "919-867-5309", "Notes: fadhjkgahkj");
    Contact.create("Darshan", "Mayer", "darshan_mayer@email.unc.edu", "919-867-5309", "Notes: fdus9");
}

module.exports = Contact;