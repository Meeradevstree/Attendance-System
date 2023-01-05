const holidaysService = require("./holidays.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");


module.exports = {

    // create
    holidays: async (req, res, next) => {
        try {
            const holidays = await holidaysService.save(req.body);
            if (holidays) {
                commonResponse.success(res, "HOLIDAYS_CRREATED", 200, holidays);
            } else {
                return commonResponse.customResponse(res, "DATA_NOT_FOUND", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    // // Get holiday
    
    // getholiday: async (req, res, next) => {
    //     try {
    //         let holiday = await holidaysService.get();
    //         if (holiday) {
    //             commonResponse.success(res, "GET_HOLIDAYS", 200, holiday, "Success");
    //         } else {
    //             return commonResponse.customResponse(res, "HOLIDAYS_NOT_FOUND", 404, {}, "holiday not found, please try again");
    //         }
    //     } catch (error) {
    //         return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    //     }
    // },
    

    //////////////////////////////////////////////////////
     
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await holidaysService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_HOLIDAYS',
                    message: `List of Holidays`,
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
                    message: `Holiday data not found.`,
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
            let updateholiday = await holidaysService.update(req.params.id, req.body);
            if (updateholiday) {
                return commonResponse.success(res, "HOLIDAY_PROFILE_UPDATE", 201, updateholiday);
            } else {
                return commonResponse.customResponse(res, "HOLIDAY_NOT_FOUND", 404, {}, "holiday not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },



//  Delete holiday

delete: async (req, res, next) => {
    try {
        let deleteholiday = await holidaysService.delete(req.params.id);
        if (deleteholiday) {
            return commonResponse.success(res, "HOLIDAY_PROFILE_DELETED", 202, deleteholiday);
        } else {
            return commonResponse.customResponse(res, "HOLIDAY_NOT_FOUND", 404, {}, "Holiday not found, please try again");
        }
    } catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},
};