const router = require("express").Router();
const controller = require("./client.controller");
const { guard } = require('../../helper');

// create
router.post(
    "/create",
    controller.client
);

// Get by id
router.get(
    "/list/:id",
    controller.getById
);


// read all
router.get(
    "/list",
    controller.list
);


// Update
router.patch(
    "/update/:id",
    guard.isAuthorized("department","edit"),
    controller.update
);

// Delete
 router.delete(
    "/delete/:id",
    guard.isAuthorized("department","delete"),
    controller.delete  
);

module.exports = router;