const router = require('express').Router();

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Users = require("../database/users-model");

const restricted = require("./authenticate-middleware");


router.post('/register', (req, res) => {
  
  const credentials = req.body

  if (isValid(credentials)) {

    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcryptjs.hashSync(credentials.password, rounds)

    credentials.password = hash

    Users.add(credentials)
        .then(user => {
          res.status(201).json({data: user})
        })



  }

});

router.post('/login', (req, res) => {
  // implement login
});


//-----------------------------------------



function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string");
}

module.exports = router;
