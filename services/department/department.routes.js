const router = require("express").Router();
const controller = require("./department.controller");
const { guard } = require('../../helper');


// create
router.post(
    "/create",
    controller.department
);

// read
router.get(
    "/get/:id",
    controller.getdepartmentById
);


// read all
router.get(
    "/get",
    controller.list
);


// Update Profile
router.patch(
    "/update/:id",
    guard.isAuthorized("member","edit"),
    controller.update
);

// Delete Profile
 router.delete(
    "/delete/:id",
    guard.isAuthorized("member","delete"),
    controller.delete  
);

module.exports = router;