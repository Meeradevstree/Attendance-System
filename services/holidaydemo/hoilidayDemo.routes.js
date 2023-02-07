const router = require('express').Router();
const controller = require('./holidayDemo.controller')
const {guard} = require('../../helper')

//create

router.post(
    '/create',
    controller.create
)

//read

router.get(
    '/list',
    controller.list
)

//update

router.put(
    '/update/:id',
    // guard.isAuthorized('holidaysDemo','edit'),
    controller.update
)

//delete

router.delete(
    '/delete/:id',
    // guard.isAuthorized('holidaysDemo','delete'),
    controller.delete
)

module.exports = router