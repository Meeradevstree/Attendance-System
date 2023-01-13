const router = require("express").Router();
const controller = require("./months.controller");
const { guard } = require('../../helper');
// const multerSetting = require("../../helper/multer").userImageUpload;

// create
router.post(
    "/create",
    controller.create
);

router.get(
    "/list",
    controller.list
);


// Update Profile
router.put(
    "/update/:id",
    // guard.isAuthorized("member","edit"),
    controller.update
);

// Delete Profile
 router.delete(
    "/delete/:id",
    guard.isAuthorized("member","delete"),
    controller.delete  
);

module.exports = router;