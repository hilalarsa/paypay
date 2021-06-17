'use strict'
var { connection } = require('../db.js')

const Employee = function (employee) {
    this.employee_name = employee.employeeName
    this.feedback_id = employee.feedbackId ? employee.feedbackId : 0 
    this.created_at = new Date()
    this.updated_at = new Date()
}

Employee.create = function (newEmp, result) {
    connection.query(
        'INSERT INTO employees set ?',
        newEmp,
        function (err, res) {
            if (err) {
                console.log('error: ', err)
                result(err, null)
            } else {
                console.log(res.insertId)
                result(null, res.insertId)
            }
        }
    )
}

Employee.findById = function (id, result) {
    connection.query(
        'SELECT * FROM employees WHERE employee_id = ? ',
        id,
        function (err, res) {
            if (err) {
                console.log('error: ', err)
                result(err, null)
            } else {
                result(null, res)
            }
        }
    )
}

Employee.findAll = function (result) {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('employees : ', res)
            result(null, res)
        }
    })
}

Employee.update = function (id, employee, result) {
    connection.query(
        'UPDATE employees SET employee_name=? WHERE employee_id = ?',
        [employee.employee_name, id],
        function (err, res) {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                result(null, res)
            }
        }
    )
}

Employee.delete = function (id, result) {
    console.log("DELETE INCOMING!")
    connection.query(
        'DELETE FROM employees WHERE employee_id = ?',
        [id],
        function (err, res) {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                result(null, res)
            }
        }
    )
}
module.exports = { Employee }
