const router = require("express").Router();
const controller = require("./leave.controller");
const { guard } = require('../../helper');
const multerSetting = require("../../helper/multer").userImageUpload;

// Create Leave
router.post (
    "/create",
    multerSetting,
    controller.leave
);

// read
router.get(
    "/list/:id",
    controller.getleaveById
);

// read
router.get(
    "/list",
    controller.list
);

// update
router.patch(
    "/update/:id",
    guard.isAuthorized("leave","edit"),
    controller.update
);

// Delete Profile
 router.delete(
    "/delete/:id",
    guard.isAuthorized("leave","delete"),
    controller.delete
);

module.exports = router;