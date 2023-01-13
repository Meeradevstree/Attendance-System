const router = require("express").Router();
const controller = require("./attendance.controller");
const { guard } = require('../../helper');


// create
router.post(
    "/create",
    controller.attendance
);

// Get user by id
router.get(
    "/list/:id",
    controller.getById
);


// read all
router.get(
    "/list",
    controller.list
);


// Update Profile
router.patch(
    "/update/:id",
    guard.isAuthorized("attendance","edit"),
    controller.update
);

// Delete Profile
 router.delete(
    "/delete/:id",
    guard.isAuthorized("attendance","delete"),
    controller.delete  
);

module.exports = router;