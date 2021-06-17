var express = require('express')
var router = express.Router()
var { Feedback } = require('../model/model_feedback')

/* GET home page. */
router.get('/', async (req, res, next) => {
    Feedback.findAll(function (err, feedback) {
        if (err) res.send(err)
        console.log('res', feedback)
        res.json({ feedback })
    })
})

router.post('/', async (req, res, next) => {
  console.log("post")
  console.log(req.body)
    const new_feedback = new Feedback(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field',
        })
    } else {
        Feedback.create(new_feedback, function (err, feedback) {
            if (err) res.send(err)
            res.json({
                error: false,
                message: 'Feedback added successfully!',
                data: feedback,
            })
        })
    }
})

router.put('/:id', async (req, res, next) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field',
        })
    } else {
        Feedback.update(
            req.params.id,
            new Feedback(req.body),
            function (err, feedback) {
                if (err) res.send(err)
                res.json({
                    error: false,
                    message: 'Feedback successfully updated',
                })
            }
        )
    }
})

router.delete('/:id', async (req, res, next) => {
    Feedback.delete(req.params.id, function (err, feedback) {
        if (err) res.send(err)
        res.json({ error: false, message: 'Feedback successfully deleted' })
    })
})

module.exports = router
