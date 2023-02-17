const { commonResponse } = require("../../helper");
const departmentModel = require("./department.model");

/*
*  Create 
*/
exports.save = async (reqBody) => {
    return await new departmentModel(reqBody).save();
};


/*
*  Get Department By Id
*/
exports.get_id = async (id) => {
    return await departmentModel.findOne({ _id: id }).populate("sub_dep_ID").lean();
    
};


// list
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
        query["department_name"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await departmentModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.list = await departmentModel.find(query).skip(skip).limit(limit).populate("sub_dep_ID").populate({path:'teamLeader' , select:['first_name','last_name','department']}).lean();

    return returnData;
};


/*
*  Update
*/
exports.update = async (id, reqBody) => {
    return await departmentModel.findOneAndUpdate({_id: id }, {$set:reqBody}, {new: true,}).lean();
};


/*
*  Delete
*/
exports.delete = async (id) => {
    return await departmentModel.removeOne({ _id: id },{new: true}).lean();
};