const router = require("express").Router();
const controller = require("./record.controller");
const { guard } = require('../../helper');
const multerSetting = require("../../helper/multer").userImageUpload;

// create
router.post(
    "/create",
    multerSetting,
    controller.record
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
    guard.isAuthorized("record","edit"),
    controller.update
);

// Delete Profile
 router.delete(
    "/delete/:id",
    guard.isAuthorized("record","delete"),
    controller.delete  
);

module.exports = router;