const router = require("express").Router();
const controller = require("./report.controller");
const { guard } = require('../../helper');


// create

router.post(
    "/create",
    controller.report
);


// list

router.get(
    "/list",
    controller.list
)


// update

router.patch(
    "/update/:id",
    guard.isAuthorized("report","edit"),
    controller.update
)

// delete
router.delete(
    "/delete/:id",
    guard.isAuthorized("report","delete"),
    controller.delete
)

module.exports = router;