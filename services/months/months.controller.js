const monthService = require("./month.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");


module.exports = {

    // create
    create: async (req, res, next) => {
        try {
            const date = await monthService.save(req.body);
            if (date) {
                commonResponse.success(res, "MONTH_CREATED", 200, date);
            } else {
                return commonResponse.customResponse(res, "MONTH_NOT_CREATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    // read 
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await monthService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_DATE',
                    message: `List of Date`,
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
                    message: `date data not found.`,
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

//   Get date By Id 
    
getById: async(req,res,next)=>{
    try{
        let date_by_id=await monthService.get_id(req.params.id);
        if (date_by_id) {
            commonResponse.success(res, "GET_DATE", 200,date_by_id);
        } else {
            return commonResponse.customResponse(res, "DATE_NOT_FOUND", 404);
        }
    }
    catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},
 
//    Update
 
    update: async (req, res, next) => {
        try {
            let updatedate = await monthService.update(req.params.id, req.body);
            if (updatedate) {
                return commonResponse.success(res, "DATE_PROFILE_UPDATE", 201, updatedate);
            } else {
                return commonResponse.customResponse(res, "DATE_NOT_UPDATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },



//  Delete date

delete: async (req, res, next) => {
    try {
        let deletedate = await monthService.delete(req.params.id);
        if (deletedate) {
            return commonResponse.success(res, "DATE_PROFILE_DELETED", 202, deletedate);
        } else {
            return commonResponse.customResponse(res, "DATE_NOT_DELETED", 404);
        }
    } catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},
};