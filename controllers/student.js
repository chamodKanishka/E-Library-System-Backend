const Student = require('../model/Student')
const Book = require('../model/Book')
const { studentRegistrationValidation , studentLoginValidation } = require('../validation/studentValidation')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerStudent = async (req, res) => {

    //Validation
    const { error } = studentRegistrationValidation(req.body)


    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    }

    //check user exist
    const studentCheck = await Student.findOne({ email: req.body.email })

    if (studentCheck) {
        return res.status(400).send({ error: 'Email Already Exixts' })
    }

    //Hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password, salt)

    const student = new Student({
        name: req.body.name,
        nsbm_Id: req.body.nsbm_Id,    
        faculty: req.body.faculty,
        email: req.body.email,
        password: hashedPassword,
    });


    try {
        const registeredStudent = await student.save();
        res.status(201).send({ success: 'true', registeredStudent, message: 'Student Registration Sucessfull' })
    } catch (err) {
        res.status(400).send({ error: err })
    }

}

exports.studentLogin = async (req, res, next) => {

    // //Req Body
    // console.log(req.body)

    // Validation Login
    const { error } = studentLoginValidation(req.body)

    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    // Student Check

    const studentCheck = await Student.findOne({ email: req.body.email })
    if (!studentCheck) {
        return res.status(400).json({ status: 400, message: " Coudn't find your student account ! " })
    }

    //PasswordComaprison
    const validPassword = await bycrpt.compare(req.body.password, studentCheck.password)
    if (!validPassword) {
        return res.status(400).json({ status: 400, message: "Incorrect Password" })
    }

// //    console.log(process.env)
    //Creating JWT Token
    const token = jwt.sign({ _id: studentCheck._id }, process.env.TOKEN_SECRET)
    res.header('auth-Token', token).send({ success: 'true', token: token, userId: studentCheck._id, message: 'Student Login Sucessfull' })

}




exports.studentGetBook = async (req, res, next) => {

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