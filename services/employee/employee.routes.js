const router = require("express").Router();
const controller = require("./employee.controller");
const { guard } = require('../../helper');
const multerSetting = require("../../helper/multer").userImageUpload;

/*
 *  Register New User
 */
router.post(
    "/create",
    multerSetting,
    controller.register
);

/*
 *  Login
 */
router.post(
    "/login",
    controller.login 
);

/*
 *  Resend verification Link
 */
router.post(
    "/resend-verification-link",
    controller.resendVerificationLink
);

/*
 *  Verify User Account
 */
router.post(
    "/verify-user",
    controller.verifyUser
);

/*
 *  Forgot Password
 */
router.post(
    "/forgot-password",
    controller.forgotPassword
);        
 

/*
 *  Reset Password
 */
router.post(
    "/reset-password",
    controller.resetPassword
);

/*
 *  Update Profile
 */
router.put(
    "/update/:id",
    guard.isAuthorized("employee","edit"),
    controller.update
);

/*
 * Delete Profile
 */
 router.delete(
    "/delete/:id",
    guard.isAuthorized("employee","delete"),
    controller.delete  
);

/*
 *  Change Password
 */
router.post(
    "/change-password/:id",
    guard.isAuthorized("employee","edit"),
    controller.changePassword
);

/*
 *  Get Profile
 */
router.get(
    "/list",
    // guard.isAuthorized(['admin', 'organizer', 'player']),
    controller.list
);

/*
 *  Get user by id
 */
router.get(
    "/list/:id",
    // guard.isAuthorized(['admin', 'organizer', 'player']),
    controller.getUserById
);

/*
 *  logout
 */
router.post(
    "/logout/:id",
    guard.isAuthorized("employee","edit"),
    controller.logout
);


router.get(
    "/getemployeeByDep/:id",
    controller.getemployeeByDepartmentId
)

module.exports = router;