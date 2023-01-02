const { commonResponse } = require("../../helper");
const sub_depModel = require("./sub-dep.model");

/*
*  Create sub_dep
*/
exports.save = async (reqBody) => {
    return await new sub_depModel(reqBody).save();
};


/*
*  Get Role By Id
*/
exports.get_id = async (id) => {
    return await sub_depModel.findOne({ _id: id }).lean();
    
};

// /*
// *  Get By Id
// */
// exports.getall = async () => {
//     return await sub_depModel.find({}).lean();
// };

///////////////////////////////////////////////////////////////////////////////

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
        query["sub_dep_name"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await sub_depModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.list = await sub_depModel.find(query).skip(skip).limit(limit).lean();

    return returnData;
};


///////////////////////////////////////////////////////////////////

/*
*  Update User
*/
exports.update = async (id, reqBody) => {
    return await sub_depModel.findOneAndUpdate({_id: id }, {$set:reqBody}, {new: true,}).lean();
};


/*
*  Delete User
*/
exports.delete = async (id) => {
    return await sub_depModel.removeOne({ _id: id },{new: true}).lean();
};