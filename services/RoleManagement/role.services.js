const { commonResponse } = require("../../helper");
const roleModel = require("./role.model");


/*
*  Create Role
*/
exports.save = async (reqBody) => {
    return await new roleModel(reqBody).save();
};


/*
*  Get role
*/
// exports.get = async () => {
//     return await roleModel.find({},{"deleted" : 0,"title":0,"__v": 0 }).lean();
// };
exports.list = async (reqQuery) => {
    let page = 0;
    let limit = 10;
    let skip = 0;
    let returnData = {
        total_counts: 0,
        total_pages: 0,
        current_page: 0,
        list: []
    };
    let query = {};

    if (reqQuery.limit && reqQuery.limit != "") {
        limit = parseInt(reqQuery.limit);
    }

    if (reqQuery.page && reqQuery.page != '') {
        page = parseInt(reqQuery.page) - 1;
        skip = page * limit;
    }

    if (reqQuery.search && reqQuery.search != "") {
        query["login_type"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await roleModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.list = await roleModel.find(query).sort({ _id: -1}).skip(skip).limit(limit).lean();

    return returnData;
};



/*
*  Get Role By Id
*/
exports.get_id = async (id) => {
    return await roleModel.findOne({ _id: id },{"deleted" : 0,"title":0,"__v": 0,"login_type":0,"title":0 ,"_id":0}).lean();
};


/*
*  Update role
*/
exports.update = async (id, reqBody) => {
    return await roleModel.findOneAndUpdate({ _id: id }, {$set:reqBody}, {new: true,}).lean();
};


/*
*  Delete role
*/
exports.delete = async (id) => {
    return await roleModel.removeOne({ _id: id },{new: true}).lean();
};