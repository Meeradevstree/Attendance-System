const { commonResponse } = require("../../helper");
const moment = require('moment')
const reportModel = require("./report.model");
const employeeModel = require("../employee/employee.model")
const departmentModel = require("../department/department.model");
const { employeeServices } = require("../employee");


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
        // const greaterDate = moment(reqQuery.gte).format('YYYY-MM-DD')
        // const lessDate = moment(reqQuery.lte).format('YYYY-MM-DD')

        query = {
            $and: [{ "employeeId": { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") } },
                // { "reportingDate": { $gte: new Date(reqQuery.gte), $lte: new Date(reqQuery.lte) } }
            ]
        }
        const employee = await employeeModel.find({ _id: reqQuery.search }).lean()
        let reportArray = []
        if (employee && employee[0].role == 'tl') {
            let depArray = []
            let empArray = []

            let department = await departmentModel.find().lean()
            department.map((dep) => {
                if (dep.teamLeader == reqQuery.search) {
                    depArray.push(dep.department_name)
                }
            })
            let result = await Promise.all(depArray.map(async a => {
                let employees = await employeeModel.find({ department: a }).sort({ _id: -1 }).populate('roleManagement').populate({ path: 'departmentdata', model: 'department', populate: { path: 'sub_dep_ID', model: 'sub_dep' } }).lean();
                employees.map((emp) => empArray.push(emp._id))
            })

            )
            empArray.push(reqQuery.search)
            if (result) {
                let final = await Promise.all(empArray.map(async r => {
                    let report = await reportModel.find({ employeeId: r }).sort({})
                        .populate({ path: 'employeeName', select: ['first_name', 'last_name'] })
                        .populate({ path: 'projectName', select: 'projectName' })
                        // .populate({ path: 'projectManager', model: 'Project' , select:'projectManager', populate: { path: 'projectManager', model: 'Employee' , select:['first_name', 'last_name'] } })
                        // .populate({ path: 'teamLeader', model: 'Project' , select:'projectLeader', populate: { path: 'projectLeader', model: 'Employee' , select:['first_name', 'last_name'] } })
                        .skip(skip).limit(limit).lean();

                    reportArray.push(...report)
                }))
                if (final) {
                    query.deleted = false;

                    returnData.total_counts = reportArray.length;
                    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
                    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;
                    returnData.list = reportArray


                    console.log('report : : : : : : : ; ; ', returnData.total_counts)
                    return returnData
                }

            }

        }

    }

    if (reqQuery.gte && reqQuery.gte != "" || reqQuery.lte && reqQuery.lte != "") {
        query = {
            $and: [{ "reportingDate": { $gte: new Date(reqQuery.gte), $lte: new Date(reqQuery.lte) } },]
        }
    }
    console.log('querrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrry : ', query)
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

};


// update
exports.update = async (id, reqBody) => {
    return await reportModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true }).lean();
};

// delete
exports.delete = async (id) => {
    return await reportModel.removeOne({ _id: id }, { new: true }).lean();
};