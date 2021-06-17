var express = require('express')
var router = express.Router()
var { Employee } = require('../model/model_employee')

/* GET home page. */
router.get('/', async (req, res, next) => {
    Employee.findAll(function (err, employee) {
        if (err) res.send(err)
        console.log('res', employee)
        res.json({ employee })
    })
})

router.post('/', async (req, res, next) => {
    const new_employee = new Employee(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field',
        })
    } else {
        Employee.create(new_employee, function (err, employee) {
            if (err) res.send(err)
            res.json({
                error: false,
                message: 'Employee added successfully!',
                data: employee,
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
        Employee.update(
            req.params.id,
            new Employee(req.body),
            function (err, employee) {
                if (err) res.send(err)
                res.json({
                    error: false,
                    message: 'Employee successfully updated',
                })
            }
        )
    }
})

router.delete('/:id', async (req, res, next) => {
    Employee.delete(req.params.id, function (err, employee) {
        if (err) res.send(err)
        res.json({ error: false, message: 'Employee successfully deleted' })
    })
})

module.exports = router
