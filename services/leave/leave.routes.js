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
    "/read/:id",
    controller.getleaveById
);

// read
router.get(
    "/read",
    controller.list
);

// update
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