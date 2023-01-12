const router = require("express").Router();
const controller = require("./holidays.controller");
const { guard } = require('../../helper');


/*
 *  create holidays
 */
router.post(
    "/create",
    controller.holidays
);

// read
router.get(
    "/get/:id",
    controller.list
);

// read all
router.get(
    "/get",
    controller.list
);


// Update Profile
router.patch(
    "/update/:id",
    guard.isAuthorized("employee","edit"),
    controller.update
);

// Delete holiday
router.delete(
    "/delete/:id",
    guard.isAuthorized("employee","delete"),
    controller.delete
);

module.exports = router;  