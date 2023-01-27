const roleService = require("./role.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");


module.exports = {
    role: async (req, res, next) => {
        try {
            const role = await roleService.save(req.body);
            if (role) {
                commonResponse.success(res, "GET_ROLE", 201, role );
            } else {
                return commonResponse.customResponse(res, "ROLE_NOT_FOUND",404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

// READ
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await roleService.list(req.query);
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
                    messageCode: 'NO_ROLE',
                    message: `No Role data.`,
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


    ///////////////////

    
    //   Get Role By Id 
    
    getById: async(req,res,next)=>{
        try{
            let role_by_id=await roleService.get_id(req.params.id);
            if (role_by_id) {
                commonResponse.success(res, "GET_ROLE_BY_ID", 200, role_by_id);
            } else {
                return commonResponse.customResponse(res, "ROLE_NOT_FOUND",404);
            }
        }
        catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    
    // Update role
    
    updaterole: async (req, res, next) => {
        try {
            let updatedrole = await roleService.update(req.params.id, req.body);
            if (updatedrole) {
                return commonResponse.success(res, "ROLE_PROFILE_UPDATE", 201, updatedrole);
            } else {
                return commonResponse.customResponse(res, "ROLE_NOT_UPDATED",404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    
    //  Delete role
    
    deleterole: async (req, res, next) => {
        try {
            let deleterole = await roleService.delete(req.params.id);
            if (deleterole) {
                return commonResponse.success(res, "ROLE_PROFILE_DELETED", 202, deleterole);
            } else {
                return commonResponse.customResponse(res, "ROLE_NOT_DELETED",404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

};