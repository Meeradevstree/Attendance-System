const router = require("express").Router();
const controller = require("./department.controller");
const { guard } = require('../../helper');
const multerSetting = require("../../helper/multer").userImageUpload;

// create
router.post(
    "/create",
    multerSetting,
    controller.department
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