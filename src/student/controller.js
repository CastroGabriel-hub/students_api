const pool = require('../../database');
const queries = require('./queries');

function getStudents(req, res) {
    pool.query(queries.getStudents, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

function getStudentById(req, res){
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

function addStudent(req, res){
    const { name, email, age, dob} = req.body;

    // check if email exists on database
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length){
            res.send('Email already exists on our database.')
        }

        // add student to database
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if(error) throw error;
            res.status(201).send('Student created sucessfully!');
        })
    })
}

function deleteStudent(req, res){
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if(noStudentFound){
            res.send('Student does not exist on database');
        }

        pool.query(queries.deleteStudent, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send('Student has been removed sucessfully!');
        })
    })
}

function updateStudent(req, res){
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if(noStudentFound){
            res.send('Student does not exist on database');
        } 
        
        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send('Student updated sucessfully');
        })
    })
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudent
}