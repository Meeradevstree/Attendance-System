const departmentService = require("./department.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {


    department: async (req, res, next) => {
        try {
            if (req.files != undefined && req.files.image != undefined) {
                req.body.image = process.env.DOMAIN_URL + "/user-profile/" + req.files.image[0].filename;
            }
            const department = await departmentService.save(req.body);
            if (department) {
                commonResponse.success(res, "DEPARTMENT_CRREATED", 200, department);
            } else {
                return commonResponse.customResponse(res, "DEPARTMENT_NOT_CREATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    //  READ
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await departmentService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_DEPARTMENT',
                    message: `List of Department data`,
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
                    messageCode: 'NO_DEPARTMENT_DATA',
                    message: `Department data not found.`,
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

   //   Get Department By Id 
    
   getById: async(req,res,next)=>{
    try{
        let department_by_id=await departmentService.get_id(req.params.id);
        if (department_by_id) {
            commonResponse.success(res, "GET_DEPARTMENT", 200, department_by_id);
        } else {
            return commonResponse.customResponse(res, "DEPARTMENT_NOT_FOUND", 404);
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
            let updatedepartment = await departmentService.update(req.params.id, req.body);
            if (updatedepartment) {
                return commonResponse.success(res, "DEPARTMENT_PROFILE_UPDATED", 201, updatedepartment);
            } else {
                return commonResponse.customResponse(res, "DEPARTMENT_NOT_UPDATED", 404);
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
            let deletedepartment = await departmentService.delete(req.params.id);
            if (deletedepartment) {
                return commonResponse.success(res, "DEPARTMENT_PROFILE_DELETED", 202, deletedepartment);
            } else {
                return commonResponse.customResponse(res, "DEPARTMENT_NOT_DELETED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
}