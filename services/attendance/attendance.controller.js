const attendanceService = require("./attendance.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {

//create 
    attendance: async (req, res, next) => {
        try {
            req.body.employeeid = await attendanceService.employeedata(req.body.employeeID);
            const attendance = await attendanceService.save(req.body);
            if (attendance) {
                commonResponse.success(res, "ATTENDANCE_CREATED", 201, attendance);
            } else {
                return commonResponse.customResponse(res, "ATTENDANCE_DATA_NOT_FOUND", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
     
    
    //  list
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await attendanceService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_ATTENDANCE',
                    message: `List of attendance data`,
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
                    messageCode: 'NO_ATTENDANCE_DATA',
                    message: `Attendance data not found.`,
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



   //   Get attendance By Id 
    
   getById: async(req,res,next)=>{
    try{
        let attendance_by_id=await attendanceService.get_id(req.params.id);
        if (attendance_by_id) {
            commonResponse.success(res, "GET_ATTENDANCE", 200, attendance_by_id);
        } else {
            return commonResponse.customResponse(res, "ATTENDANCE_NOT_FOUND", 404, {});
        }
    }
    catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},


 /* 
 *  Update
 */
    update: async (req, res, next) => {
        try {
            req.body.employeeid = await attendanceService.employeedata(req.body.employeeID);
            let updateattendance = await attendanceService.update(req.params.id, req.body);
            if (updateattendance) {
                return commonResponse.success(res, "ATTENDANCE_PROFILE_UPDATE", 201, updateattendance);
            } else {
                return commonResponse.customResponse(res, "ATTENDANCE_NOT_FOUND", 404, {});
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


/*
* Delete
*/
    delete: async (req, res, next) => {
        try {
            let deleteattendance = await attendanceService.delete(req.params.id);
            if (deleteattendance) {
                return commonResponse.success(res, "ATTENDANCE_PROFILE_DELETED", 202, deleteattendance);
            } else {
                return commonResponse.customResponse(res, "ATTENDANCE_NOT_FOUND", 404, {});
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
}