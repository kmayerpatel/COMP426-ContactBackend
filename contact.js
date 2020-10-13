class Contact {

    constructor(id, first, last, email, phone, notes) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.email = email;
        this.phone = phone;
        this.notes = notes;
    }
}

let database = []

Contact.findAll = () => {
    return database.map((c) => {
        return c.id;
    });
};

Contact.find = (id) => {
    return database.find((c => {
        return c.id == id;
    }));
}

Contact.next_id = 0
Contact.create = (first, last, email, phone, notes) => {

    let result = new Contact(Contact.next_id, first, last, email, phone, notes);
    database.push(result);
    Contact.next_id += 1;
    return result;
}

Contact.delete = (id) => {
    database = database.filter((c) => {
        return c.id != id;
    });
}

// Hardcode some initial contacts.

Contact.create("John", "Doe", "john_doe@email.unc.edu", "919-867-5309", "Notes: sdfjkl");
Contact.create( "Sally", "Walters", "sally_walters@email.unc.edu", "919-867-5309", "Notes: affsdasd");
Contact.create( "Rajan", "Shah", "rajan_shah@email.unc.edu", "919-867-5309", "Notes: gjfkls");
Contact.create( "Anita", "Rao", "anita_rao@email.unc.edu", "919-867-5309", "Notes: f sdhjfsjh");
Contact.create( "Sejal", "Patel", "sejal_patel@email.unc.edu", "919-867-5309", "Notes: fadhjkgahkj");
Contact.create( "Darshan", "Mayer", "darshan_mayer@email.unc.edu", "919-867-5309", "Notes: fdus9");

module.exports = Contact;