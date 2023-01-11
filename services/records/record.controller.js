const recordService = require("./record.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");


module.exports = {

    // create
    record: async (req, res, next) => {
        try {
            const record = await recordService.save(req.body);
            if (record) {
                commonResponse.success(res, "DATE_CREATED", 200, record);
            } else {
                return commonResponse.customResponse(res, "DATE_NOT_CREATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    // read 
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await recordService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_RECORD',
                    message: `List of Record`,
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
                    message: `record data not found.`,
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

//   Get RECORD By Id 
    
getById: async(req,res,next)=>{
    try{
        let record_by_id=await recordService.get_id(req.params.id);
        if (record_by_id) {
            commonResponse.success(res, "GET_RECORD", 200,record_by_id);
        } else {
            return commonResponse.customResponse(res, "RECORD_NOT_FOUND", 404);
        }
    }
    catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},
 
//    Update
 
    update: async (req, res, next) => {
        try {
            let update = await recordService.update(req.params.id, req.body);
            if (update) {
                return commonResponse.success(res, "RECORD_PROFILE_UPDATE", 201, update);
            } else {
                return commonResponse.customResponse(res, "RECORD_NOT_UPDATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },



//  Delete date

delete: async (req, res, next) => {
    try {
        let deleterecord = await recordService.delete(req.params.id);
        if (deleterecord) {
            return commonResponse.success(res, "RECORD_PROFILE_DELETED", 202, deleterecord);
        } else {
            return commonResponse.customResponse(res, "RECORD_NOT_DELETED", 404);
        }
    } catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},
};