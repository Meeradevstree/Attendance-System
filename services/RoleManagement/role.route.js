const router = require("express").Router();
const controller = require("./role.controller");
const { guard } = require('../../helper');


//create role
router.post(
    "/create",
    controller.role
);


// read
router.get(
    "/get",
    controller.list
);


// Get user by id
router.get(
    "/get/:id",
    controller.getById
);


// update
router.patch(
    "/update/:id",
    controller.updaterole
);


// Delete Role
 router.delete(
    "/delete/:id",
    controller.deleterole
);

module.exports = router;