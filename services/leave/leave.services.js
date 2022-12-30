const { commonResponse } = require("../../helper");
const leaveModel = require("./leave.model");
// const leaveModel = require("../leave/leave.model");


// create leave
exports.save = async (reqBody) => {
    return await new leaveModel(reqBody).save();
};


/*
*  Get By Id
*/
exports.get = async () => {
    return await leaveModel.find({}).populate("employeeID").lean();
};


///////////////////


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
        query["employeeID"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await leaveModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.list = await leaveModel.find(query).skip(skip).limit(limit).populate("employeeID").lean();

    return returnData;
};


///////////////////////////////////////////////////////


/*
*  Update leave
*/
exports.update = async (id, reqBody) => {
    return await leaveModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true, }).lean();
};


/*
*  Delete leave
*/
exports.delete = async (id) => {
    return await leaveModel.removeOne({ _id: id }, { new: true }).lean();
};
