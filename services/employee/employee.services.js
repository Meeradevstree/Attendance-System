const { commonResponse } = require("../../helper");
const employeeModel = require("./employee.model");
const roleModel = require("../RoleManagement/role.model");
const leaveModel = require("../leave/leave.model");
const attendanceModel = require("../attendance/attendance.model");
const dateModel = require("../date/date.model");
const departmentModel = require("../department/department.model");
const { Model } = require("mongoose");
const moment = require('moment')

/*
*  Check Email Exist
*/
exports.is_exist = async (reqBody) => {
    return await employeeModel.findOne({ email: reqBody.email }).lean();
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

    if ((reqQuery.search && reqQuery.search != "") || (reqQuery.name && reqQuery.name != "")) {
        query = {
            $and: [{ "department": { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") } },
            { "first_name": { $regex: new RegExp(".*" + reqQuery.name.toLowerCase(), "i") } },]
        }
        query.deleted = false;
        returnData.total_counts = await employeeModel.countDocuments(query).lean();
        returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
        returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

        returnData.list = await employeeModel.find(query).sort({ _id: -1 }).skip(skip).limit(limit).populate('roleManagement').populate({ path: 'departmentdata', model: 'department', populate: { path: 'sub_dep_ID', model: 'sub_dep' } }).lean();

        return returnData;
    } else if (reqQuery.birth && reqQuery.birth == 'sort') {

        query.deleted = false;
        returnData.total_counts = await employeeModel.countDocuments(query).lean();
        returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
        returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;


        const check = await employeeModel.find(query).skip(skip).limit(limit).populate('roleManagement').populate({ path: 'departmentdata', model: 'department', populate: { path: 'sub_dep_ID', model: 'sub_dep' } }).lean();
        let todayDate = new Date()
        let dat = moment(todayDate).format('MM-DD')
        check.sort((a, b) => {
            let now = moment(new Date(dat)).format('MM-DD')
            let aDate = moment(new Date(a.birthdate)).format('MM-DD')
            let bDate = moment(new Date(b.birthdate)).format('MM-DD')
            console.log('sdfghjkdfghjksdfghjklszfghjkl',aDate,bDate,now)
            if (aDate >= now && bDate >= now) {
                if (aDate >= bDate) {
                    return 0
                } else {
                    return -2
                }
            } else if (aDate >= now && bDate <= now) {
                if (aDate >= bDate) {
                    return -1
                } else {
                    return 1
                }
            } else if (aDate <= now) {
                return 1
            } else {
                console.log('elseeeeeeeeeeeeeeeee', aDate, bDate);
            }
        }
        )

        check.map((a) => {
            console.log('check ================================== >', a.birthdate)
        })

        returnData.list = check
        return returnData
    } else {
        query.deleted = false;
        returnData.total_counts = await employeeModel.countDocuments(query).lean();
        returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
        returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

        returnData.list = await employeeModel.find(query).sort({ _id: -1 }).skip(skip).limit(limit).populate('roleManagement').populate({ path: 'departmentdata', model: 'department', populate: { path: 'sub_dep_ID', model: 'sub_dep' } }).lean();
        return returnData
    }


};


/*
*  Get By Id 
*/
exports.getbyid = async (id) => {
    return await employeeModel.findOne({ _id: id }).sort({ _id: -1 }).lean();
};


/*
*  Get By Id
*/
exports.get_id = async (id) => {
    return await employeeModel.findOne({ _id: id }).sort({ _id: -1 }).populate('roleManagement', { "_id": 0, "deleted": 0, "login_type": 0, "title": 0, "__v": 0 }).populate({ path: 'departmentdata', model: 'department', populate: { path: 'sub_dep_ID', model: 'sub_dep' } }).lean();
};


/*
*  Add New User
*/
exports.save = async (reqBody) => {
    console.log('request : ', reqBody)
    let find = await employeeModel.findOne().sort({ employeeNo: -1 }).lean()
    let unique;
    if (find) {
        unique = parseInt(find.employeeNo) + 1
    } else {
        unique = 1
    }
    reqBody.employeeNo = unique
    return await new employeeModel(reqBody).save();
};


/*
*  Update leave
*/
exports.update = async (id, reqBody) => {
    return await employeeModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true, }).lean();
};


/*
*  Delete User
*/
exports.delete = async (id) => {
    let leave_data = await leaveModel.removeOne({ employeeID: id }).lean();
    console.log("Delete Leave function : ", leave_data);
    let attendance_data = await attendanceModel.removeOne({ employeeID: id }).lean();
    console.log("Delete Attendance function: ", attendance_data);
    let date_data = await dateModel.removeOne({ employeeID: id }).lean();
    console.log("Delete Date function: ", date_data);
    return await employeeModel.removeOne({ _id: id }, { new: true }).lean();
};


// getroledata
exports.roledata = async (id) => {
    let rolemanagement_data = await roleModel.findOne({ _id: id }).lean();
    console.log(rolemanagement_data);
    if (rolemanagement_data) {
        return rolemanagement_data.login_type;
    }
}


// getdepartmentdata
exports.departmentdata = async (id) => {
    let department_data = await departmentModel.findOne({ _id: id }).lean();
    console.log(department_data);
    if (department_data) {
        return department_data.department_name;
    }
}

exports.getDepById = async (depId) => {
    return await departmentModel.find({ departmentdata: depId }).lean()
}

exports.get = async (id) => {
    return await employeeModel.findOne({ _id: id })
}