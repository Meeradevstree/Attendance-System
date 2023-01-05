const jwt = require("jsonwebtoken");
const commonResponse = require("./commonResponse");
const Users = require("../services/member/member.model");
const usersServices = require("../services/member");
const roles = require("../services/RoleManagement/role.model")
const createToken = (user, type = "user") => {
  let payload = {
    id: user._id.toString(),
    role: user.role
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
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userInfo;
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
        const user = await Users.findById({ _id: req.user.id });
        console.log("user : " , user)
        if (user) {
          const getRoleAccessData = await roles.findById({ _id: user.roleManagement });
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
          return commonResponse.unAuthentication(res, "ROLE_NOT_FOUND", 403, "user not found");
        }
      }
      else {
        return commonResponse.unAuthentication(res, "ROLE_NOT_FOUND", 404, "user not verified");
      }
    };


module.exports = {
  createToken,
  isAuthorized,
};