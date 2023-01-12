const passport = require("passport");
const CustomStrategy = require("passport-custom").Strategy;
const employeeModel = require("../services/employee/employee.model");

const commonFunctions = require("./functions");
// Passport Custom Strategy
passport.use(
  "employee",
  new CustomStrategy(async function (req, done) {
    try {
      req.body.email = req.body.email.toLowerCase();
      let employee = await employeeModel.findOne({ email: req.body.email });
      console.log("Employee Data : ", employee);
      if (!employee) {
        return done(new Error("INVALID_EMAIL"));
      }
      let isPasswordValid = await commonFunctions.matchPassword( req.body.password, employee.password );
      console.log("isPasswordValid : ",isPasswordValid);
      if(isPasswordValid){
        return done(null, employee); 
      }else{
        return done(new Error("INVALID_PASSWORD"));
      }
    } catch (error) {
      return done(error);
    }
  })
);

