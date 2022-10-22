/* File Name: contact_list.js
Student Name: CHI SING LEUNG
Student ID: 301268517
Date: 22 Oct 2022
Description: Add for Assignment 2
*/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require("passport");

// connect to our Book Model
//let Book = require("../models/book");

let bookController = require("../controllers/contact_list");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Route for the Book List page - READ Operation */
router.get("/", bookController.displayBookList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", requireAuth, bookController.addpage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", requireAuth, bookController.addprocesspage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", requireAuth, bookController.displayeditpage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", requireAuth, bookController.processingeditpage);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, bookController.deletepage);

module.exports = router;
