const { commonResponse } = require("../../helper");
const monthModel = require("./months.model");

/*
*  Create
*/
exports.save = async (reqBody) => {
    return await new monthModel(reqBody).save();
};


/*
*  Get Date By Id
*/
exports.get_id = async (id) => {
    return await monthModel.findOne({ _id: id },{"deleted" : 0,"_id":0,"__v": 0}).lean();
    
};

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
        query["1"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await monthModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;
    returnData.list = await monthModel.find(query).skip(skip).limit(limit).populate({path:'january',model:'Date', populate: {path: '1',model: 'Record'}}).lean();

    return returnData;
};


// //////////////////////////////////////////////////////////


/*
*  Update
*/
exports.update = async (id, reqBody) => {
    return await monthModel.findOneAndUpdate({_id: id }, {$set:reqBody}, {new: true,}).lean();
};


/*
*  Delete
*/
exports.delete = async (id) => {
    return await monthModel.removeOne({ _id: id },{new: true}).lean();
};