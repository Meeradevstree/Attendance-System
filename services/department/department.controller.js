const departmentService = require("./department.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {


    department: async (req, res, next) => {
        try {
            const department = await departmentService.save(req.body);
            if (department) {
                commonResponse.success(res, "DEPARTMENT_CRREATED", 200, department);
            } else {
                return commonResponse.customResponse(res, "DATA_NOT_FOUND", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },



/*
*  Get Profile
*/
    // get: async (req, res, next) => {
    //     try {
    //         let department = await departmentService.getall(req.body._id);
    //         if (department) {
    //             commonResponse.success(res, "GET_PROFILE", 200, department, "Success");
    //         } else {
    //             return commonResponse.customResponse(res, "DEPARTMENT_NOT_FOUND", 404, {}, "Department not found, please try again");
    //         }
    //     } catch (error) {
    //         return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    //     }
    // },


    
//////////////////////////////////////////////////////
     
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await departmentService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_ROLE_MANAGEMENT',
                    message: `List of Role Management`,
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
                    messageCode: 'NO_LOYALTY_POINTS',
                    message: `No loyalty points found.`,
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

    // get by id
    getdepartmentById: async (req, res, next) => {
        try {
            let department = await departmentService.get(req.role.id);
            if (department) {
                commonResponse.success(res, "GET_DEPARTMENT_DATA", 200, department);
            } else {
                return commonResponse.customResponse(res, "DATA_NOT_FOUND", 404);
            }
        } catch (error) {
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
                return commonResponse.success(res, "DEPARTMENT_PROFILE_UPDATE", 201, updatedepartment);
            } else {
                return commonResponse.customResponse(res, "DEPARTMENT_NOT_FOUND", 404, {}, "Department not found, please try again");
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
                return commonResponse.customResponse(res, "DEPARTMENT_NOT_FOUND", 404, {}, "Department not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
}