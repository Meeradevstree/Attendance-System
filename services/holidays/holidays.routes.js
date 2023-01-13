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
    "/list/:id",
    controller.list
);

// read all
router.get(
    "/list",
    controller.list
);


// Update Profile
router.patch(
    "/update/:id",
    guard.isAuthorized("holidays","edit"),
    controller.update
);

// Delete holiday
router.delete(
    "/delete/:id",
    guard.isAuthorized("holidays","delete"),
    controller.delete
);

module.exports = router;  