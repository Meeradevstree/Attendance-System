const { commonResponse } = require("../../helper");
const projectModel = require("./project.model");

/*
*  Create 
*/
exports.save = async (reqBody) => {
    return await new projectModel(reqBody).save();
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
        query["projectName"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await projectModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.list = await projectModel.find(query).sort({}).populate({path:'projectMember' , select:['first_name','last_name','email','image']}).populate({path:'projectLeader' , select:['first_name','last_name','email','image']}).populate({path:'projectManager' , select:['first_name','last_name','email','image']}).skip(skip).limit(limit).lean();

    return returnData;
};


/*
*  Update
*/
exports.update = async (id, reqBody) => {
    return await projectModel.findOneAndUpdate({_id: id }, {$set:reqBody}, {new: true}).lean();
};


/*
*  Delete
*/
exports.delete = async (id) => {
    return await projectModel.removeOne({ _id: id }, { new: true }).lean();
};