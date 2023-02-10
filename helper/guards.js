const jwt = require("jsonwebtoken");
const commonResponse = require("./commonResponse");
const employeeModel = require("../services/employee/employee.model");
const employeeServices = require("../services/employee");
const roles = require("../services/RoleManagement/role.model")
const createToken = (employee, type = "employee") => {
  let payload = {
    id: employee._id.toString(),
    role: employee.role
  };

  const token = jwt.sign(payload, "jsonwebtoken", {
    expiresIn: process.env.EXPIRE_JWT_SECRET || "30d",
  });
  payload.token = token;
  return payload;
};

const verifyJWT = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer", "").trim();
    console.log(token);
    const employeeInfo = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = employeeInfo;
    return 1;
  } catch (error) {
    return 0;
  }
};



const isAuthorized =
  (moduleName="", actionType="") =>
    async (req, res, next) => {
      console.log("moduleName : "  , moduleName);
      console.log(actionType);
      const isVerify = verifyJWT(req, res);
      if (isVerify) {
        const employee = await employeeModel.findById({ _id: req.employee.id });
        console.log("employee : " , employee)
        if (employee) {
          const getRoleAccessData = await roles.findById({ _id: employee.roleManagement });
          console.log("get role access data =>", getRoleAccessData)
          if (getRoleAccessData) {
            console.log("getRoleAccessData[moduleName] : "  ,getRoleAccessData[moduleName]);
              if (getRoleAccessData[moduleName]) {
                if (getRoleAccessData[moduleName].includes(actionType)) {
                  next();
                } else {
                  return commonResponse.customResponse(res, "REQUEST_NOT_ALLOWED", 403, {}, `You Don't Have Access`);
                }
              } else {
                return commonResponse.unAuthentication(res, "ROLE_NOT_FOUND", 403, `${moduleName} role not found`);
              }
          }
          else {
            return commonResponse.unAuthentication(res, "ROLE_NOT_FOUND", 403, "roleaccessdata not found");
          }
        } else {
          return commonResponse.unAuthentication(res, "ROLE_NOT_FOUND", 403, "employee not found");
        }
      }
      else {
        return commonResponse.unAuthentication(res, "ROLE_NOT_FOUND", 404, "employee not verified");
      }
    };


module.exports = {
  createToken,
  isAuthorized,
};