const Admin = require('../model/Admin')
const Book = require('../model/Book')
const { adminlogin_Validation , adminAddBookValidation } = require('../validation/adminValidation')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.adminLogin = async (req, res, next) => {

    //Req Body
    console.log(req.body)

    // Validation Login
    const { error } = adminlogin_Validation(req.body)

    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    // Admin Check

    const adminCheck = await Admin.findOne({ email: req.body.email })
    if (!adminCheck) {
        return res.status(400).json({ status: 400, message: " Coudn't find your admin account ! " })
    }

    //PasswordComaprison
    const validPassword = await bycrpt.compare(req.body.password, adminCheck.password)
    if (!validPassword) {
        return res.status(400).json({ status: 400, message: "Incorrect Password" })
    }

//    console.log(process.env)
    //Creating JWT Token
    const token = jwt.sign({ _id: adminCheck._id }, process.env.TOKEN_SECRET)
    res.header('auth-Token', token).send({ success: 'true', token: token, userId: adminCheck._id, message: 'Admin Login Sucessfull' })

}

exports.adminAddBook = async (req, res, next) => {

    // //Req Body
    // console.log(req.body)

    // Validation Login
    const { error } = adminAddBookValidation(req.body)

    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    const book = new Book({
        title  : req.body.title,
        ISBN  : req.body.ISBN,
        author  : req.body.author,
        description : req.body.description,
        category : req.body.category,
        added_by_email : req.body.added_by_email,
        no_copies : req.body.no_copies
    });


    try {
        const addedBook = await book.save();
        res.status(201).send({ success: 'true', addedBook, message: 'Book Added Sucessfull' })
    } catch (err) {
        res.status(400).send({ error: err })
    }
}


exports.adminGetBook = async (req, res, next) => {

    const category = req.query.category
    // const page = parseInt(req.query.page)
    // const limit = parseInt(req.query.limit)

    // console.log(page, 'Page', limit, 'Limit')

    // const startIndex = (page - 1) * limit
    // const endIndex = page * limit



    //get all pending students
    //const data = await Students.where({ type: 'student', is_verified: false })

    const results = {}

    // const pageCount = await Company.countDocuments().exec() / limit

    // results.pageCount = Math.ceil(pageCount)

    // if (endIndex < await Company.countDocuments().exec()) {
    //     results.next = {
    //         page: page + 1,
    //         limit: limit
    //     }
    // }

    // if (startIndex > 0) {

    //     results.previous = {
    //         page: page - 1,
    //         limit: limit
    //     }
    // }

    //.limit(limit).skip(startIndex).exec()

    if(category === '*'){
       // console.log('All Books')
        results.results = await Book.find({ })

    }else if(category === '1'){
       // console.log('1')
        results.results = await Book.find({ category : 1})
    }
    else if(category === '2'){
       // console.log('2')
        results.results = await Book.find({ category : 2})
    }
    else if(category === '3'){
        //console.log('3')
        results.results = await Book.find({ category : 3})
    }
    else if(category === '4'){
        //console.log('4')
        results.results = await Book.find({ category : 4})
    }else{
        //console.log('All Books')
        results.results = await Book.find({ })
    }


    try {
        // const registeredUser = await user.save();
        res.status(200).send({ success: 'true', results, message: 'Get Books Sucessfull' })
    } catch (err) {
        res.status(400).send({ error: err })
    }


}