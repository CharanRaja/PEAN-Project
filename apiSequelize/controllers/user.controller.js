const db = require("../models");
const User = db.users;
var passwordHash = require('password-hash');
const config = require('../routes/user.route');
var jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Save User in the database
  var hashedPassword = passwordHash.generate(req.body.password);
  req.body.password = hashedPassword;
  User.create(req.body)
    .then(data => {
      res.status(200).send({ success: true, msg: 'User Registered Successfully' });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while doing registration"
      });
    });
};

exports.login = (req, res) => {
  let query = {
    emailId: req.body.emailId
  }

  User.findOne({ "where": query, raw: true }).then(data => {
    if (data) {
      var decrypt = passwordHash.verify(req.body.password, data.password)
      if (decrypt) {
        data.auth = true;
        const token = jwt.sign({ id: data.id }, config.secret.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200);
        res.json({
          success: true,
          user: data,
          token: token
        });
      } else {
        res.status(500).send({
          message: "Password was Incorrect"
        });
      }
    } else {
      res.status(500).send({
        message: "User Not Found for the given emailId"
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "User Not Found"
      });
    })
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll({
    raw: true, order: [["lastName", "ASC"]], attributes: [
      'firstName',
      'lastName',
      'emailId',
      'country']
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.checkEmailId = (req, res) => {


  //If no input is provided
  if (!req.body) {
    res.status(401).json({
      userExist: false
    });
  } else {
    // Otherwise continue
    const emailId = req.body.emailId;
    // User.findAll({ where: { emailId: { [Op.like]: `%${emailId}%` } } },)
    User.findOne({ where: { emailId: emailId } },)
      .then(data => {
        if (data) {
          res.status(200).send({ userExist: true });
        } else {
          res.status(200).send({ userExist: false });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
  }
};