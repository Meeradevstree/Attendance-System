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
    "/get/:id",
    controller.getById
);


// read all
router.get(
    "/get",
    controller.list
);


// Update Profile
router.patch(
    "/update/:id",
    // guard.isAuthorized("employee","edit"),
    controller.update
);

// Delete Profile
 router.delete(
    "/delete/:id",
    guard.isAuthorized("employee","delete"),
    controller.delete  
);

module.exports = router;