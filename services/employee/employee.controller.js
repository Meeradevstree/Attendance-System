const employeeService = require("./employee.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {

    
    //   Register New User
    
    register: async (req, res, next) => {
        try {
            if(req.body.email){
                req.body.email = req.body.email.toLowerCase();
            }
            let is_exist = await employeeService.is_exist(req.body);
            if (is_exist) {
                return next(new Error("EMAIL_EXIST"));
            }

            if (req.files != undefined && req.files.image != undefined) {
                req.body.image = process.env.DOMAIN_URL + "/user-profile/" + req.files.image[0].filename;
            }

            req.body.password = await commonFunctions.encryptStringCrypt(req.body.password);

            // // req.body.otp = await commonFunctions.randomSixDigit();
            // var otp = Math.random();
            // otp = otp * 1000000;
            // otp = parseInt(otp);
            // // console.log(req.body);
            // req.body.otp=otp;
            
            req.body.role = await employeeService.roledata(req.body.roleManagement);
            req.body.department = await employeeService.departmentdata(req.body.departmentdata);

            let user = await employeeService.save(req.body);

            if (user) {
                /* Send Account Verification Link */
                let emailData = {
                    to: user.email,
                    subject: "Boiler-plat || Account Verification OTP",
                    text: `Your account verification Link Is ${user.otp}`,
                    html: `<h1> Boiler-plat </h1>
                            <p>Your account verification OTP is :  ${user.otp}</b></p>`,
                };
                nodemailer.sendMail(emailData);

                let getUser = await employeeService.list(user._id);
                console.log("get user data => ",getUser)
                commonResponse.success(res, "USER_CREATED", 201, user);
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, user);
            }
        } catch (error) {
            console.log("Create User -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    
    //   Login
    
    login: async (req, res, next) => {
        passport.authenticate("employee", async function (err, user, info) {
            if (err) {
                var err = err;
                err.status = 400;
                return next(err);
            }

            if (info) {
                var err = new Error("MISSING_CREDENTIALS");
                err.status = 400;
                return next(err);
            }

            if (user) {

                // if (user.status == 'pending') {
                //     return commonResponse.customResponse(res, "USER_NOT_VERIFIED", 401, user, "Please verify your email to login");
                // }
                // if (user.status == 'deactivated') {
                //     return commonResponse.customResponse(res, "USER_DEACTIVATED", 404, user, "Your account has been deactivated, Please contact admin to activate your account");
                // }

                // await employeeService.update(user._id, {
                //     fcm_token: req.body.fcm_token ? req.body.fcm_token : "",
                //     device_type: req.body.device_type ? req.body.device_type : "android",
                //     device_id: req.body.device_id ? req.body.device_id : "",
                // });

                let userResponse = await employeeService.get_id(user._id);
                const token = await guard.createToken(user, userResponse.role);
                userResponse.token = token.token;
                return commonResponse.success(res, "LOGIN_SUCCESS", 202, userResponse);
            } else {
                return commonResponse.customResponse(res, "USER_NOT_FOUND", 404);
            }
        })(req, res, next);
    },


    
    //   Resend Verification Link
    
    resendVerificationLink: async (req, res, next) => {
        try {
            if(req.body.email){
                req.body.email = req.body.email.toLowerCase();
            }
            let user = await employeeService.is_exist(req.body);
            if (user) {
                //let otp = await commonFunctions.randomSixDigit();
                var otp = Math.random();
                otp = otp * 1000000;
                otp = parseInt(otp);
                console.log(otp);

                let updateData = {
                    otp: otp
                };
                let updateUser = await employeeService.update(user._id, updateData);
                if (updateUser) {
                    /* Send Account Verification OTP */
                    let emailData = {
                        to: updateUser.email,
                        subject: "Boiler-plat || Account Verification OTP",
                        text: `Your account verification Link Is ${updateUser.otp}`,
                        html: `<h1> Boiler-plat </h1>
                                <p>Your account verification OTP is :  ${updateUser.otp}</b></p>`,
                    };
                    nodemailer.sendMail(emailData);

                    return commonResponse.success(res, "RESEND_VERIFICATION_LINK_SUCCESS", 201);
                } else {
                    return commonResponse.customResponse(res, "SERVER_ERROR", 400);
                }
            } else {
                return commonResponse.customResponse(res, "EMAIL_NOT_EXIST", 404);
            }
        } catch (error) {
            console.log("Resend User Verification Link -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    //   Verify User
    
    verifyUser: async (req, res, next) => {
        try {
            let getUser = await employeeService.is_exist(req.body);
            if (getUser) {

                if (getUser.status == 'deactivated') {
                    return commonResponse.customResponse(res, "USER_DEACTIVATED", 404, getUser);
                }
                if (req.body.otp != getUser.otp || req.body.otp == 0 || req.body.otp == '0') {
                    return commonResponse.customResponse(res, "INVALID_OTP", 406, getUser);
                }

                let updateData = {
                    status: 'verified',
                    otp: 0
                };

                let updateUserDetails = await employeeService.update(getUser._id, updateData);
                if (updateUserDetails) {
                    const token = await guard.createToken(updateUserDetails, "user");
                    updateUserDetails.token = token.token;
                    return commonResponse.success(res, "USER_VERIFIED_SUCCESS", 202, updateUserDetails);
                } else {
                    return commonResponse.customResponse(res, "SERVER_ERROR", 401);
                }
            } else {
                return commonResponse.customResponse(res, "EMAIL_NOT_EXIST", 401);
            }
        } catch (error) {
            console.log("Verify User -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    
    //   Forgot Password
    
    forgotPassword: async (req, res, next) => {
        try {
            if(req.body.email){
                req.body.email = req.body.email.toLowerCase();
            }
            let checkUserExist = await employeeService.is_exist(req.body);
            if (checkUserExist) {

                if (checkUserExist.status == 'deactivated') {
                    return commonResponse.customResponse(res, "USER_DEACTIVATED", 401, checkUserExist);
                }
                //let otp = await commonFunctions.randomSixDigit();
                var otp = Math.random();
                otp = otp * 1000000;
                otp = parseInt(otp);
                console.log(otp);

                let updateData = {
                    otp: otp
                };
                let updateUser = await employeeService.update(checkUserExist._id, updateData);
                /* Send Reset Password OTP */
                let emailData = {
                    to: updateUser.email,
                    subject: "Boiler-plat || Reset Password OTP",
                    text: `Your Reset Password OTP Is ${updateUser.otp}`,
                    html: `<h1> Boiler-plat </h1>
                            <p>Your Reset Password verification OTP is <br><br><b>${updateUser.otp}</b></p>`,
                };
                nodemailer.sendMail(emailData);

                return commonResponse.success(res, "FORGOT_PASSWORD_SUCCESS", 201, updateUser);
            } else {
                return commonResponse.customResponse(res, "EMAIL_NOT_EXIST", 401);
            }
        } catch (error) {
            console.log("User Forgot Password -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    
    //   Reset Password
    
    resetPassword: async (req, res, next) => {
        try {
            let user = await employeeService.get(req.body._id);
            if (user) {

                if (user.status == 'pending') {
                    return commonResponse.customResponse(res, "USER_NOT_VERIFIED", 401, user);
                }
                if (user.status == 'deactivated') {
                    return commonResponse.customResponse(res, "USER_DEACTIVATED", 404, user);
                }

                if (req.body.new_password == req.body.confirm_password) {
                    req.body.new_password = await commonFunctions.encryptStringCrypt(req.body.new_password);
                    let updateData = {
                        password: req.body.new_password,
                    };
                    let updateUserDetails = await employeeService.update(user._id, updateData);
                    if (updateUserDetails) {
                        return commonResponse.success(res, "PASSWORD_RESET_SUCCESS", 201, updateUserDetails);
                    } else {
                        return commonResponse.customResponse(res, "SERVER_ERROR", 401);
                    }
                } else {
                    return commonResponse.customResponse(res, "INVALID_CONFIRM_PASSWORD", 400);
                }
            } else {
                return commonResponse.customResponse(res, "USER_NOT_FOUND", 404);
            }
        } catch (error) {
            console.log("User Reset Password -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    
//  Update user

update: async (req, res, next) => {
    try {
            req.body.role = await employeeService.roledata(req.body.roleManagement);
            req.body.department = await employeeService.departmentdata(req.body.departmentdata);
        let updateduser = await employeeService.update(req.params.id, req.body);
        if (updateduser) {
            return commonResponse.success(res, "USER_PROFILE_UPDATE", 201, updateduser);
        } else {
            return commonResponse.customResponse(res, "USER_NOT_FOUND", 404);
        }
    } catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},


    
    //  Delete Profile
    
    delete: async (req, res, next) => {
        try {
            let deleteUser = await employeeService.delete(req.params.id);
            if (deleteUser) {
                return commonResponse.success(res, "USER_PROFILE_DELETED", 202, deleteUser);
            } else {
                return commonResponse.customResponse(res, "USER_NOT_FOUND", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    
    //   Change Password
    
    changePassword: async (req, res, next) => {
        try {
            let getUser = await employeeService.is_exist(req.body);
            if (getUser) {
                let isPasswordValid = await commonFunctions.matchPassword(
                    req.body.old_password,
                    getUser.password
                );
                if (isPasswordValid) {
                    if (req.body.new_password == req.body.confirm_password) {
                        req.body.new_password = await commonFunctions.encryptStringCrypt(
                            req.body.new_password
                        );
                        let updateData = {
                            password: req.body.new_password,
                        };
                        let updatePassword = await employeeService.update(getUser._id, updateData);
                        if (updatePassword) {
                            return commonResponse.success(res, "PASSWORD_CHANGED_SUCCESS", 202, updatePassword);
                        } else {
                            return commonResponse.customResponse(res, "SERVER_ERROR", 400);
                        }
                    } else {
                        return commonResponse.customResponse(res, "INVALID_CONFIRM_PASSWORD", 401);
                    }
                } else {
                    return commonResponse.customResponse(res, "INVALID_OLD_PASSWORD", 406);
                }
            } else {
                return commonResponse.customResponse(res, "USER_NOT_FOUND", 404);
            }
        } catch (error) {
            console.log("User Change Password -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


// read


   list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await employeeService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_PROOFILE',
                    message: `List of all user profile`,
                    pagination: {
                        total_counts: list.total_counts,
                        total_pages: list.total_pages,
                        current_page: list.current_page,
                        
                    },
                    data: list.list
                }
            } else {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'NO_DATA',
                    message: `User data not found`,
                    pagination: {
                        total_counts: list.total_counts,
                        total_pages: list.total_pages,
                        current_page: list.current_page,
                    },
                    data: list.list
                }
            }
            return commonResponse.customSuccess(res, resp);

        } catch (error) {
            console.log("TCL: error", error)
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500)
        }
    },

    ////////////////////////////////////////////////////////////

    
    //   Get User By Id 
    
    getUserById: async (req, res, next) => {
        try {
            let User = await employeeService.getbyid(req.params.id);
            if (User) {
                commonResponse.success(res, "GET_USER", 200, User);
            } else {
                return commonResponse.customResponse(res, "USER_NOT_FOUND", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },



    //   logout
    logout: async (req, res, next) => {
        try {
            let updateData = {
                fcm_token: '',
                device_id: ''
            };    
            console.log("req.body.id :" , req.body)
            let update = await employeeService.update(req.params.id, updateData);
            if (update) {
                return commonResponse.success(res, "USER_LOGOUT", 202, update);
            } else {
                return commonResponse.customResponse(res, "SERVER_ERROR", 405);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    getemployeeByDepartmentId:async(req,res,next) => {
        try {
            let employeeListByDepId =await employeeService.getDepById(req.params.id);
            
            console.log("employeeListByDepId : " , employeeListByDepId)
            let resp;
            if (employeeListByDepId.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'employeeListByDepId_OF_PROOFILE',
                    message: `employeeListByDepId of all user profile`,
                    pagination: {
                        total_counts: employeeListByDepId.total_counts,
                        total_pages: employeeListByDepId.total_pages,
                        current_page: employeeListByDepId.current_page,
                        
                    },
                    data: employeeListByDepId
                }
            } else {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'NO_DATA',
                    message: `User data not found`,
                    pagination: {
                        total_counts: employeeListByDepId.total_counts,
                        total_pages: employeeListByDepId.total_pages,
                        current_page: employeeListByDepId.current_page,
                    },
                    data: employeeListByDepId.employeeListByDepId
                }
            }
            return commonResponse.customSuccess(res, resp);
        } catch (error) {
            
        }


    }
};