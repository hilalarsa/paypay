'use strict'
var { connection } = require('../db.js')

const Feedback = function (feedback) {
    this.feedback_message = feedback.feedbackMessage
    this.feedback_from = feedback.feedbackFrom
    this.feedback_to = feedback.feedbackTo
}

Feedback.create = function (newFed, result) {
    console.log("CREATE")
    console.log(newFed)
    connection.query('INSERT INTO feedback set ?', newFed, function (err, res) {
        if (err) {
            console.log('error: ', err)
            result(err, null)
        } else {
            console.log(res.insertId)
            result(null, res.insertId)
        }
    })
}

Feedback.findById = function (id, result) {
    connection.query(
        'SELECT * FROM feedback WHERE feedback_id = ? ',
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

Feedback.findAll = function (result) {
    console.log('FIND ALL')
    connection.query('SELECT * FROM feedback', function (err, res) {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('feedback : ', res)
            result(null, res)
        }
    })
}

Feedback.update = function (id, feedback, result) {
    console.log(feedback)
    connection.query(
        'UPDATE feedback SET feedback_message=?,feedback_from=?,feedback_to=? WHERE feedback_id = ?',
        [
            feedback.feedback_message,
            feedback.feedback_from,
            feedback.feedback_to,
            id,
        ],
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

Feedback.delete = function (id, result) {
    connection.query(
        'DELETE FROM feedback WHERE feedback_id = ?',
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
module.exports = { Feedback }
