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
                commonResponse.success(res, "DEPARTMENT_CRREATED", 200, dashboard);
            } else {
                return commonResponse.customResponse(res, "DATA_NOT_FOUND", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },



    
    //   Get dashboard

    get: async (req, res, next) => {
        try {
            let dashboard = await dashboardService.getall(req.body._id);
            if (dashboard) {
                commonResponse.success(res, "GET_PROFILE", 200, dashboard, "Success");
            } else {
                return commonResponse.customResponse(res, "DASHBOARD_NOT_FOUND", 404, {}, "Dashboard not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


    // get by id
    getdashboardById: async (req, res, next) => {
        try {
            let dashboard = await dashboardService.get(req.role.id);
            if (dashboard) {
                commonResponse.success(res, "GET_D_DATA", 200, dashboard);
            } else {
                return commonResponse.customResponse(res, "DATA_NOT_FOUND", 404);
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
                return commonResponse.customResponse(res, "DASHBOARD_NOT_FOUND", 404, {}, "dashboard not found, please try again");
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
                return commonResponse.customResponse(res, "DASHBOARD_NOT_FOUND", 404, {}, "Dashboard not found, please try again");
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
}