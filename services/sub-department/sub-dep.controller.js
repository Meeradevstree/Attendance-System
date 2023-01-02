const sub_depService = require("./sub-dep.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {

// create
    sub_dep: async (req, res, next) => {
        try {
            const sub_dep = await sub_depService.save(req.body);
            if (sub_dep) {
                commonResponse.success(res, "DEPARTMENT_CRREATED", 200, sub_dep);
            } else {
                return commonResponse.customResponse(res, "DATA_NOT_FOUND", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


//   Get Profile

    // get: async (req, res, next) => {
    //     try {
    //         let sub_dep = await sub_depService.getall(req.body._id);
    //         if (sub_dep) {
    //             commonResponse.success(res, "GET_PROFILE", 200, sub_dep, "Success");
    //         } else {
    //             return commonResponse.customResponse(res, "SUB_DEP_NOT_FOUND", 404, {}, "sub_dep not found, please try again");
    //         }
    //     } catch (error) {
    //         return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    //     }
    // },
    /////////////////////////////////////////////////////////////////////


    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await sub_depService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_SUB_DEPARTMENT',
                    message: `List of sub_department`,
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


    
   //   Get Sub_dep By Id 
    
   getById: async(req,res,next)=>{
    try{
        let sub_dep_by_id=await sub_depService.get_id(req.params.id);
        if (sub_dep_by_id) {
            commonResponse.success(res, "GET_SUB_DEP", 200, sub_dep_by_id, "Success");
        } else {
            return commonResponse.customResponse(res, "SUB_DEP_NOT_FOUND", 404, {}, "Sub_Department not found, please try again");
        }
    }
    catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},


//   Update
 
    update: async (req, res, next) => {
        try {
            let updatesub_dep = await sub_depService.update(req.params.id, req.body);
            if (updatesub_dep) {
                return commonResponse.success(res, "DEPARTMENT_PROFILE_UPDATE", 201, updatesub_dep);
            } else {
                return commonResponse.customResponse(res, "DEPARTMENT_NOT_FOUND", 404, {}, "sub_dep not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


//  Delete

    delete: async (req, res, next) => {
        try {
            let deletesub_dep = await sub_depService.delete(req.params.id);
            if (deletesub_dep) {
                return commonResponse.success(res, "SUB_DEP_PROFILE_DELETED", 202, deletesub_dep);
            } else {
                return commonResponse.customResponse(res, "SUB_DEP_NOT_FOUND", 404, {}, "sub_dep not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
}