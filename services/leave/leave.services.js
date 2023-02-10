const { commonResponse } = require("../../helper");
const leaveModel = require("./leave.model");
const employeeModel = require("../employee/employee.model");
const { find } = require("lodash");
const  populate  = require("./leave.model")


// // gmail
// exports.is_exist = async (reqBody) => {
//     return  await leaveModel.findOne({email: reqBody.email}).lean();
// };


// create leave
exports.save = async (reqBody) => {
    // let checkLeave = await leaveModel.find({_id: id}).lean();
    console.log('checkLeave ===========> ',reqBody)
    // return await new leaveModel(reqBody).save();
};


/*
*  Get By Id
*/
exports.get = async (id) => {
    return await leaveModel.find({ _id: id }.sort({ _id: -1}), { new: true }).populate("employeeID").lean();
};


///////////////////////////////////////////////////////


exports.list = async (reqQuery) => {
    let page = 0;
    let limit = 10;
    let skip = 0;
    let returnData = {
        total_counts: 0,
        total_pages: 0,
        current_page: 0,
        pending_leave:0,
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
        query["employeeid"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await leaveModel.countDocuments(query).lean();

    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));

    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.pending_leave = await leaveModel.countDocuments({status:"pending"}).countDocuments({deleted:"false"}).lean();
    returnData.approved_leave = await leaveModel.countDocuments({status:"Approved"}).countDocuments({deleted:"false"}).lean();

    returnData.list = await leaveModel.find(query).sort({ _id: -1}).skip(skip).limit(limit).populate("employeeID").lean();

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
    return await leaveModel.removeOne({ _id: id },{new:true}).lean();
};


// getroledata
exports.employeedata = async (id) => {
    // let rolemanagement_data = await roleModel.findOne({_id:id}).lean();
    let employee_data = await  employeeModel.findOne({_id:id}).lean();
    console.log(employee_data);
    if(employee_data){
        return employee_data._id;
    }
    // console.log(rolemanagement_data);
}