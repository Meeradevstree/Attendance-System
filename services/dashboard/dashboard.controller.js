const dashboardService = require("./dashboard.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {

    // create dashboard
    dashboard: async (req, res, next) => {
        try {
            const dashboard = await dashboardService.save(req.body);
            if (dashboard) {
                commonResponse.success(res, "DASHBOARD_CRREATED", 201, dashboard);
            } else {
                return commonResponse.customResponse(res, "DASHBOARD_NOT_FOUND", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },




    //  list
    list: async (req, res, next) => {
        try {
            const list = await dashboardService.list();
            console.log('res =====================>: ',list)
            let resp;
            if (Object.entries(list).length > 0) {
                console.log('iffffffffffffffffffffffffffff')
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_DASHBOARD',
                    message: `List of Dashboard`,
                    data: list
                }
            } else {
                console.log('elseeeeeeeeeeeeeeeeeeeeeeeee')
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'NO_DASHBOARD_DATA',
                    data: list
                }
            }
            return commonResponse.customSuccess(res, resp);
        } catch (error) {
            console.log("TCL: error", error)
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500)
        }
    },


    // get by id
    getdashboardById: async (req, res, next) => {
        try {
            let dashboard = await dashboardService.get(req.role.id);
            if (dashboard) {
                commonResponse.success(res, "GET_DASHBOARD_DATA", 200, dashboard);
            } else {
                return commonResponse.customResponse(res, "DASHBOARD_NOT_FOUND", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    
    //   Update
    
    update: async (req, res, next) => {
        try {
            let updatedashboard = await dashboardService.update(req.params.id, req.body);
            if (updatedashboard) {
                return commonResponse.success(res, "DASHBOARD_PROFILE_UPDATE", 201, updatedashboard);
            } else {
                return commonResponse.customResponse(res, "DASHBOARD_NOT_FOUND", 404 );
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


//  Delete

    delete: async (req, res, next) => {
        try {
            let deletedashboard = await dashboardService.delete(req.params.id);
            if (deletedashboard) {
                return commonResponse.success(res, "DASHBOARD_PROFILE_DELETED", 202, deletedashboard);
            } else {
                return commonResponse.customResponse(res, "DASHBOARD_NOT_FOUND", 404 );
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
}