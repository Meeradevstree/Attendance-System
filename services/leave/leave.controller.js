const leaveService = require("./leave.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");


module.exports = {


    // create leave
    leave: async (req, res, next) => {
        try {
            const leave = await leaveService.save(req.body);
            if (leave) {
                commonResponse.success(res, "GET_LEAVE", 200, leave, "Success");
            } else {
                return commonResponse.customResponse(res, "Leave_NOT_FOUND", 404, {}, "Leave not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


//  Get leave details By Id 

    getleaveById: async (req, res, next) => {
        try {
            let leave = await leaveService.get();
            if (leave) {
                commonResponse.success(res, "GET_LEAVE", 200, leave, "Success");
            } else {
                return commonResponse.customResponse(res, "LEAVE_NOT_FOUND", 404, {}, "Leave not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    
//////////////////////////////////////////////////////
     
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await leaveService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_LEAVE',
                    message: `List of Leave Requesting`,
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
                    messageCode: 'NO_LEAVE',
                    message: `No leave data.`,
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

////////////////////////////////////////////////////////


//  Update leave

    update: async (req, res, next) => {
        try {
            let updatedLeave = await leaveService.update(req.params.id, req.body);
            if (updatedLeave) {
                return commonResponse.success(res, "LEAVE_PROFILE_UPDATE", 201, updatedLeave);
            } else {
                return commonResponse.customResponse(res, "LEAVE_NOT_FOUND", 404, {}, "Leave not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },



//  Delete leave

    delete: async (req, res, next) => {
        try {
            let deleteleave = await leaveService.delete(req.params.id);
            if (deleteleave) {
                return commonResponse.success(res, "LEAVE_PROFILE_DELETED", 202, deleteleave);
            } else {
                return commonResponse.customResponse(res, "LEAVE_NOT_FOUND", 404, {}, "Leave not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
};