var express = require('express')
var router = express.Router()
const studentController  = require('../controllers/student')


//Student Routes
router.post('/studentRgister', studentController.registerStudent) 
router.post('/studentLogin', studentController.studentLogin) 
router.get('/getBooks', studentController.studentGetBook) 

module.exports = router
