const clientService = require("./client.services");
const passport = require("passport");
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {


    client: async (req, res, next) => {
        try {
            const client = await clientService.save(req.body);
            if (client) {
                commonResponse.success(res, "CLIENT_CREATED", 201, client);
            } else {
                return commonResponse.customResponse(res, "CLIENT_NOT_CREATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },

    //  READ
    list: async (req, res, next) => {
        // let language_code = req.headers.language_code ? req.headers.language_code : 'en';
        try {
            const list = await clientService.list(req.query);
            let resp;
            if (list.list.length > 0) {
                resp = {
                    error: false,
                    statusCode: 200,
                    messageCode: 'LIST_OF_CLIENT',
                    message: `List of Client data`,
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
                    messageCode: 'NO_CLIENT_DATA',
                    message: `Client data not found.`,
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


   //   Get By Id 
    
   getById: async(req,res,next)=>{
    try{
        let client_by_id=await clientService.get_id(req.params.id);
        if (client_by_id) {
            commonResponse.success(res, "GET_CLIENT", 200, client_by_id);
        } else {
            return commonResponse.customResponse(res, "CLIENT_NOT_FOUND", 404);
        }
    }
    catch (error) {
        return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
    }
},


 /* 
 *  Update
 */
    update: async (req, res, next) => {
        try {
            let updateclient = await clientService.update(req.params.id, req.body);
            if (updateclient) {
                return commonResponse.success(res, "CLIENT_PROFILE_UPDATED", 201, updateclient);
            } else {
                return commonResponse.customResponse(res, "CLIENT_NOT_UPDATED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },


/*
* Delete
*/
    delete: async (req, res, next) => {
        try {
            let deleteclient = await clientService.delete(req.params.id);
            if (deleteclient) {
                return commonResponse.success(res, "CLIENT_PROFILE_DELETED", 202, deleteclient);
            } else {
                return commonResponse.customResponse(res, "CLIENT_NOT_DELETED", 404);
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {}, error.message);
        }
    },
}