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