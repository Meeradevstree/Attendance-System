const router = require("express").Router();
const controller = require("./dashboard.controller");
const { guard } = require('../../helper');


/*
 *  create 
 */
router.post(
    "/create",
    controller.dashboard
);

// read
router.get(
    "/get/:id",
    controller.getdashboardById
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

// Delete Profile
 router.delete(
    "/delete/:id",
    guard.isAuthorized("employee","delete"),
    controller.delete  
);

module.exports = router;