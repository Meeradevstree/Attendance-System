const router = require("express").Router();
const controller = require("./project.controller")
const { guard } = require('../../helper');


/*
 *  create 
 */
router.post(
    "/create",
    controller.project
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
    guard.isAuthorized("project","edit"),
    controller.update
);

// Delete holiday
router.delete(
    "/delete/:id",
    guard.isAuthorized("project","delete"),
    controller.delete
);

module.exports = router;  