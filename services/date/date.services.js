const { commonResponse } = require("../../helper");
const dateModel = require("./date.model");

/*
*  Create
*/
exports.save = async (reqBody) => {
    return await new dateModel(reqBody).save();
};


/*
*  Get Date By Id
*/
exports.get_id = async (id) => {
    return await dateModel.findOne({ _id: id }).populate("employeeID").lean();
    
};

exports.list = async (reqQuery) => {
    let page = 0;
    let limit = 100;
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
        query["date"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await dateModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;
    returnData.list = await dateModel.find(query).skip(skip).limit(limit).populate("employeeID").lean();

    return returnData;
};


//////////////////////////////////////////////////////////


/*
*  Update
*/
exports.update = async (id, reqBody) => {
    return await dateModel.findOneAndUpdate({_id: id }, {$set:reqBody}, {new: true,}).lean();
};


/*
*  Delete
*/
exports.delete = async (id) => {
    return await dateModel.removeOne({ _id: id },{new: true}).lean();
};