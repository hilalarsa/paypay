var express = require('express')
var router = express.Router()
var { Employee } = require('../model/model_employee')

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.send("HOME")
})

module.exports = router
