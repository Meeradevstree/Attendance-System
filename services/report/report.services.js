const { commonResponse } = require("../../helper");
const reportModel = require("./report.model");
const departmentAPI = require("../department/department.model")


// create
exports.save = async (reqBody) => {
    reqBody.employeeId = reqBody.employeeName
    return await new reportModel(reqBody).save();
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
        query["employeeId"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
        query.deleted = false;
        returnData.total_counts = await reportModel.countDocuments(query).lean();
        returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
        returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

        returnData.list = await reportModel.find(query).sort({})
            .populate({ path: 'employeeName', select: ['first_name', 'last_name'] })
            .populate({ path: 'projectName', select: 'projectName' })
            // .populate({ path: 'projectManager', model: 'Project' , select:'projectManager', populate: { path: 'projectManager', model: 'Employee' , select:['first_name', 'last_name'] } })
            // .populate({ path: 'teamLeader', model: 'Project' , select:'projectLeader', populate: { path: 'projectLeader', model: 'Employee' , select:['first_name', 'last_name'] } })
            .skip(skip).limit(limit).lean();

        return returnData;
    } else if (reqQuery.role && reqQuery.role != "") {
        if (reqQuery.role == 'hr' || reqQuery.role == "ceo") {
            returnData.total_counts = await reportModel.countDocuments(query).lean();
            returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
            returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

            returnData.list = await reportModel.find(query).sort({})
                .populate({ path: 'employeeName', select: ['first_name', 'last_name'] })
                .populate({ path: 'projectName', select: 'projectName' })
                // .populate({ path: 'projectManager', model: 'Project' , select:'projectManager', populate: { path: 'projectManager', model: 'Employee' , select:['first_name', 'last_name'] } })
                // .populate({ path: 'teamLeader', model: 'Project' , select:'projectLeader', populate: { path: 'projectLeader', model: 'Employee' , select:['first_name', 'last_name'] } })
                .skip(skip).limit(limit).lean();

            return returnData;
        } else if (reqQuery.role == 'tl') {
            const departmentData = await departmentAPI.find().lean()
            console.log('department : ======================',)
        }

    }

    returnData.total_counts = await reportModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.list = await reportModel.find(query).sort({})
        .populate({ path: 'employeeName', select: ['first_name', 'last_name'] })
        .populate({ path: 'projectName', select: 'projectName' })
        // .populate({ path: 'projectManager', model: 'Project' , select:'projectManager', populate: { path: 'projectManager', model: 'Employee' , select:['first_name', 'last_name'] } })
        // .populate({ path: 'teamLeader', model: 'Project' , select:'projectLeader', populate: { path: 'projectLeader', model: 'Employee' , select:['first_name', 'last_name'] } })
        .skip(skip).limit(limit).lean();

    return returnData;


};


// update
exports.update = async (id, reqBody) => {
    return await reportModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
};

// delete
exports.delete = async (id) => {
    return await reportModel.removeOne({ _id: id }, { new: true }).lean();
};