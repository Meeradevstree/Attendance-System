const projectService = require("./project.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");


module.exports = {

    // create
    project: async (req, res, next) => {
        try {
            const project = await projectService.save(req.body);
            if (project) {
                commonResponse.success(res, "PROJECT_CREATED", 201, project);
            } else {
                return commonResponse.customResponse(res, "PROJECT_NOT_CREATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    // read 
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await projectService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_PROJECT',
                    message: `List of Project`,
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
                    message: `Project data not found.`,
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
 
//    Update
 
    update: async (req, res, next) => {
        try {
            let updateproject = await projectService.update(req.params.id, req.body);
            if (updateproject) {
                return commonResponse.success(res, "PROJECT_PROFILE_UPDATE", 201, updateproject);
            } else {
                return commonResponse.customResponse(res, "PROJECT_NOT_UPDATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },



//  Delete holiday

delete: async (req, res, next) => {
    try {
        let deleteproject = await projectService.delete(req.params.id);
        if (deleteproject) {
            return commonResponse.success(res, "PROJECT_PROFILE_DELETED", 202, deleteproject);
        } else {
            return commonResponse.customResponse(res, "PROJECT_NOT_DELETED", 404);
        }
    } catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},
};