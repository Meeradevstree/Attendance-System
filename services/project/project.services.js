const { commonResponse } = require("../../helper");
const projectModel = require("./project.model");

/*
*  Create Holidays
*/
exports.save = async (reqBody) => {
    return await new projectModel(reqBody).save();
};


/*
*  Get holiday
*/
// exports.get = async () => {
//     return await holidaysModel.find({}).lean();
// };

/////////////////////////////////////////////


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
        query["procjectName"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await projectModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.list = await projectModel.find(query).sort({holiday_date: 1}).populate({path:'projectMember' , select:['first_name','last_name','email']}).populate({path:'projectLeader' , select:['first_name','last_name','email']}).skip(skip).limit(limit).lean();

    return returnData;
};


///////////////////////////////////////////////////////


/*
*  Update User
*/
exports.update = async (id, reqBody) => {
    return await projectModel.findOneAndUpdate({_id: id }, {$set:reqBody}, {new: true,}).lean();
};


/*
*  Delete holiday
*/
exports.delete = async (id) => {
    return await projectModel.removeOne({ _id: id }, { new: true }).lean();
};