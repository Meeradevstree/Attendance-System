const  reportServices = require("./report.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, customResponse, nodemailer } = require("../../helper");


module.exports = {


    // create
    report: async (req, res, next) => {
        try{
            const report = await reportServices.save(req.body);
            if (report) {
                commonResponse.success(res, "REPORT_CREATED", 201, report);
            } else {
                return commonResponse.customResponse(res, "REPORT_DATA_NOT_CREATED",404);
            }
        }catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

//    list

list: async (req, res, next) => {
    // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
    try {
        const list = await reportServices.list(req.query);
        let resp;
        if (list.list.length > 0) {
            resp = {
                error: false,
                statusCode: 200,
                messageCode: 'LIST_OF_REPORT',
                message: `List of Report`,
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
                message: `Report data not found.`,
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


// Update

update: async (req, res, next) => {
    try {
        let updatereport = await reportServices.update(req.params.id, req.body);
        if (updatereport) {
            return commonResponse.success(res, "REPORT_PROFILE_UPDATE", 201, updatereport);
        } else {
            return commonResponse.customResponse(res, "REPORT_NOT_UPDATED", 404);
        }
    } catch {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},

// Delete 

delete: async (req,res, next) => {
    try{
        let deletereport = await reportServices.delete(req.params.id);
        if (deletereport) {
            return commonResponse.success(res, "REPORT_PROFILE_DELETED", 202, deletereport);
        } else {
            return commonResponse.customResponse(res, "REPORT_NOT_DELETED", 404);
        }
    } catch (error){
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},
};