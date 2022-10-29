/* File Name: contact_list.js
Student Name: CHI SING LEUNG
Student ID: 301268517
Date: 22 Oct 2022
Description: Add for Assignment 2
*/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let Contact = require("../models/contact_list");

module.exports.displayContactList = (req, res, next) => {
  Contact.find((err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(contactList);

      res.render("contact/list", {
        title: "Business Contact List",
        ContactList: contactList,
        displayName: req.user ? req.user.displayName : "",
      });
      //render list.ejs and pass title and ContactList variable we are passing contactList object to ContactList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("contact/add", {
    title: "Add your contact information",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newContact = Contact({
    contact_name: req.body.contact_name,
    contact_number: req.body.contact_number,
    email: req.body.email,
  });
  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact list
      res.redirect("/contact-list");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Contact.findById(id, (err, contacttoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("contact/edit", {
        title: "Edit Contact",
        contact: contacttoedit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecontact = Contact({
    _id: id,
    contact_name: req.body.contact_name,
    contact_number: req.body.contact_number,
    email: req.body.email,

  });
  Contact.updateOne({ _id: id }, updatecontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the contact list
      res.redirect("/contact-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh contact list
      res.redirect("/contact-list");
    }
  });
};
