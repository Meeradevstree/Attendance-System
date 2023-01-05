const router = require("express").Router();
const controller = require("./sub-dep.controller");
const { guard } = require('../../helper');


/*
 *  create 
 */
router.post(
    "/create",
    controller.sub_dep
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


// Update sub_dep
router.patch(
    "/update/:id",
    guard.isAuthorized("member","edit"),
    controller.update
);

// Delete sub_dep
 router.delete(
    "/delete/:id",
    guard.isAuthorized("member","delete"),
    controller.delete  
);

module.exports = router;