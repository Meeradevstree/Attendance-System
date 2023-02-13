const leaveService = require("./leave.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");


module.exports = {


    // create leave
    leave: async (req, res, next) => {
        try {
        
            req.body.employeeid = await leaveService.employeedata(req.body.employeeID);
            const leave = await leaveService.save(req.body);
            console.log("leave============================>",leave)
            if (leave) {
              
                let getLeave = await leaveService.list(leave._id);
                console.log("get leave data ==============> ", getLeave)
                // commonResponse.success(res, "GET_LEAVE", 201, leave);
            } else {
                return commonResponse.customResponse(res, "LEAVE_NOT_FOUND",404);
            }
        } catch (error) {
            console.log("error==>",error)
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


//  Get leave details By Id 

    getleaveById: async (req, res, next) => {
        try {
            let leave = await leaveService.get(req.params.id);
            if (leave) {
                commonResponse.success(res, "GET_LEAVE_BY_ID", 200, leave);
            } else {
                return commonResponse.customResponse(res, "LEAVE_NOT_FOUND",404);
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
                messageCode: 'LIST_LEAVE_MANAGEMENT',
                message: `List of Leave `,
                pagination: {
                    total_counts: list.total_counts,
                    total_pages: list.total_pages,
                    current_page: list.current_page,
                    pending_leave: list.pending_leave,
                    approved_leave: list.approved_leave,
                },
                data: list.list
            }
        } else {
            resp = {
                error: false,
                statusCode: 200,
                messageCode: 'NO_Leave',
                message: `No Leave data.`,
                pagination: {
                    total_counts: list.total_counts,
                    total_pages: list.total_pages,
                    current_page: list.current_page,
                    pending_leave: list.pending_leave,
                    approved_leave: list.approved_leave,
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
            // req.body.employeeid = await leaveService.employeedata(req.body.employeeID);
            let updatedLeave = await leaveService.update(req.params.id, req.body);
            if (updatedLeave) {
                return commonResponse.success(res, "LEAVE_PROFILE_UPDATE", 201, updatedLeave);
            } else {
                return commonResponse.customResponse(res, "LEAVE_NOT_UPDATED", 404);
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
                return commonResponse.customResponse(res, "LEAVE_NOT_DELETED",404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
};