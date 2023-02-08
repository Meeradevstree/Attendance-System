const { commonResponse } = require("../../helper");
const dashboardModel = require("./dashboard.model");
const departmentModel = require("./../department/department.model")
let employeeModel = require("../employee/employee.model")
let leaveModel = require("../leave/leave.model")

/*
*  Create Holidays
*/
exports.save = async (reqBody) => {
    // let department = await departmentModel.find({}).lean()
    // let employee = await employeeModel.find({}).lean()
    // let leave = await leaveModel.find({}).lean()
    // reqBody.totalDepartment=department.length
    // reqBody.totalEmployee=employee.length
    // reqBody.LeaveApply=leave.length
    console.log('department : ',reqBody)
    // return await new dashboardModel(reqBody).save();
};


/*
*  Get By Id
*/
// exports.get = async (req) => {
//     console.log('request : ',req)
//     return await dashboardModel.find({}).lean();
// };

/*
*  Get all
*/
// exports.getall = async () => {
//     return await dashboardModel.find({}).lean();
// };


/////////////////////////////////////////////


exports.list = async () => {
    let returnData = {}
    let department = await departmentModel.find({}).countDocuments().lean()
    let employee = await employeeModel.find({}).countDocuments().lean()
    let leave = await leaveModel.find({}).countDocuments().lean()
    let pending = await leaveModel.find({}).countDocuments({status:"pending"}).countDocuments({deleted:"false"}).lean()


    returnData.department = department;
    returnData.employee = employee;
    returnData.leave = leave;
    returnData.pending = pending;
    // console.log('returnData : ',returnData)
    return returnData;


};


///////////////////////////////////////////////////////



/*
*  Update User
*/
exports.update = async (id, reqBody) => {
    return await dashboardModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true, }).lean();
};


/*
*  Delete User
*/
exports.delete = async (id) => {
    return await dashboardModel.removeOne({ _id: id }, { new: true }).lean();
};
