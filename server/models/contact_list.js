/* File Name: contact_list.js
Student Name: CHI SING LEUNG
Student ID: 301268517
Date: 22 Oct 2022
Description: Add for Assignment 2
*/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let contactListModel = mongoose.Schema(
  {
    contact_name: String,
    contact_number: String,
    email: String,
  },

  {
    collection: "contactList",
  }
);

//contact model to create new contact list more powerful than just class
module.exports = mongoose.model("ContactList", contactListModel);
