var express = require('express')
var router = express.Router()
const adminController  = require('../controllers/admin')

//Middleware
const isAuth = require('../middleware/isAuth')

//Admin Routes
router.post('/adminLogin', adminController.adminLogin) 
router.post('/addBook', isAuth , adminController.adminAddBook) 
router.get('/getBooks', isAuth , adminController.adminGetBook) 

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource admin')
// })

module.exports = router
