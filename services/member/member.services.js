const { commonResponse } = require("../../helper");
const UsersModel = require("./member.model");
const roleModel = require("../RoleManagement/role.model");
const departmentModel = require("../department/department.model");

/*
*  Check Email Exist
*/
exports.is_exist = async (reqBody) => {
    return  await UsersModel.findOne({email: reqBody.email}).lean();
};


// /*
// *  Get 
// */
// exports.get = async () => {
//     return await UsersModel.find({}).populate('roleManagement').populate({path:'departmentdata',model:'department', populate: {path: 'sub_dep_ID',model: 'sub_dep'}}).lean();
// };

//////////////////////////////


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
        query["first_name","last_name","department"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await UsersModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.list = await UsersModel.find(query).skip(skip).limit(limit).populate('roleManagement').populate({path:'departmentdata',model:'department', populate: {path: 'sub_dep_ID',model: 'sub_dep'}}).lean();

    return returnData;
};


///////////////////////////////////////////////////////

/*
*  Get By Id 
*/
exports.getbyid = async (id) => {
    return await UsersModel.findOne({ _id: id }).lean();
};


/*
*  Get By Id
*/
exports.get_id = async (id) => {
    return await UsersModel.findOne({ _id: id }).populate('roleManagement',{"_id" : 0, "deleted" : 0,"login_type": 0,"title":0, "__v": 0}).populate({path:'departmentdata',model:'department', populate: {path: 'sub_dep_ID',model: 'sub_dep'}}).lean();
    
};


/*
*  Add New User
*/
exports.save = async (reqBody) => {
    return await new UsersModel(reqBody).save();
};


/*
*  Update User
*/
exports.update = async (id, reqBody) => {
    return await UsersModel.findOneAndUpdate({_id: id }, {$set:reqBody}, {new: true,}).lean();
};


/*
*  Delete User
*/
exports.delete = async (id) => {
    return await UsersModel.removeOne({ _id: id },{new: true}).lean();
};


// getroledata
exports.roledata = async (id) => {
    // let rolemanagement_data = await roleModel.findOne({_id:id}).lean();
    let rolemanagement_data = await  roleModel.findOne({_id:id}).lean();
    console.log(rolemanagement_data);
    if(rolemanagement_data){
        return rolemanagement_data.login_type;
    }
    // console.log(rolemanagement_data);
}


// getdepartmentdata
exports.departmentdata = async (id) => {
    // let rolemanagement_data = await roleModel.findOne({_id:id}).lean();
    let department_data = await  departmentModel.findOne({_id:id}).lean();
    console.log(department_data);
    if(department_data){
        return department_data.department_name;
    }
}