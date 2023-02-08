const HolidaysDemoServices = require('./holidayDemo.service')
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {

    //create

    create: async (req, resp, next) => {
        try {
            let create = await HolidaysDemoServices.create(req.body);
            if (create) {
                commonResponse.success(resp, "HOLIDAY_DEMO_CREATED", 201, create)
            } else {
                return commonResponse.customResponse(resp, "HOLIDAY_DEMO_NOT_CREATED", 404)
            }
        } catch (err) {
            return commonResponse.CustomError(resp, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, err.message);
        }
    },

    //read

    list: async (req, res, next) => {
        try {
            let list = await HolidaysDemoServices.get(req.query)
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200 ,
                    messageCode: 'LIST_OF_HOLIDAYS_DEMO',
                    message: `List of Holidays demo`,
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
                    message: `Holiday demo data not found.`,
                    pagination: {
                        total_counts: list.total_counts,
                        total_pages: list.total_pages,
                        current_page: list.current_page,
                    },
                    data: list.list
                }
            }
            return commonResponse.customSuccess(res, resp);
        } catch (err) {
            return commonResponse.customResponse(resp, "HOLIDAY_DEMO_LIST_NOT_FOUND", 404)
        }
    },

    //update

    update: async (req, res, next) => {
        try {
            let update = await HolidaysDemoServices.update(req.params.id, req.body);
            if (update) {
                return commonResponse.success(res, "HOLIDAY_PROFILE_UPDATE", 201, update);
            } else {
                return commonResponse.customResponse(res, "HOLIDAY_NOT_UPDATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    //delete

    delete: async (req, res, next) => {
        try {
            let deleteHoliday = await HolidaysDemoServices.delete(req.params.id);
            if (deleteHoliday) {
                return commonResponse.success(res, "HOLIDAY_DEMO_DELETED", 202, deleteHoliday);
            } else {
                return commonResponse.customResponse(res, "HOLIDAY_DEMO_NOT_DELETED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },




}