const { commonResponse } = require("../../helper");
const dashboardModel = require("./dashboard.model");
const departmentModel = require("./../department/department.model")
let employeeModel = require("../employee/employee.model")
let leaveModel = require("../leave/leave.model")


exports.list = async () => {
    let returnData = {}
    let department = await departmentModel.find({}).countDocuments().lean()
    let employee = await employeeModel.find({}).countDocuments().lean()
    let leave = await leaveModel.find({}).countDocuments().lean()
    let pending = await leaveModel.find({}).countDocuments({ status: "pending" }).countDocuments({ deleted: "false" }).lean()

    returnData.department = department;
    returnData.employee = employee;
    returnData.leave = leave;
    returnData.pending = pending;
    return returnData;


};

exports.listById = async (id) => {
    console.log('reqBody :::::::::::  :: : : :  : ; ;  : ; ; ; : : : : : : : ', id)
}


/*
*  Update
*/
exports.update = async (id, reqBody) => {
    return await dashboardModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true, }).lean();
};


/*
*  Delete
*/
exports.delete = async (id) => {
    return await dashboardModel.removeOne({ _id: id }, { new: true }).lean();
};
