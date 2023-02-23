const {employeeRoutes} = require("../services/employee/index");
const {leaveRoutes} = require("../services/leave/index-leave");
const roleRoutes  = require("../services/RoleManagement/index-role");
const holidaysRoutes = require("../services/holidays/index-holidays");
const departmentRoutes = require("../services/department/index-department");
const sub_depRoutes = require("../services/sub-department/sub-dep.index");
const dashboardRoutes = require("../services/dashboard/dashboard-index");
const attendanceRoutes = require("../services/attendance/attendance-index");
const dateRoutes = require("../services/date/index-date");
const projectRoutes = require("../services/project/project.index");
const reportRoutes = require("../services/report/report.index");
const clientRoutes = require("../services/client/client.index");

const initialize = (app) => {
  app.use("/api/employee", employeeRoutes);
  app.use("/api/leave", leaveRoutes);
  app.use("/api/role", roleRoutes);
  app.use("/api/holidays", holidaysRoutes);
  app.use("/api/department", departmentRoutes);
  app.use("/api/sub_dep", sub_depRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/attendance", attendanceRoutes);
  app.use("/api/date", dateRoutes);
  app.use("/api/project", projectRoutes);
  app.use("/api/report", reportRoutes);
  app.use("/api/client", clientRoutes);
   
  app.use("/authError", (req, res, next) => {
    return next(new Error("DEFAULT_AUTH"));
  });

  
  app.get("/ping", (req, res) => {
    res.status(200).send({
      success: true,
      statusCode: 200,
    });
  });
};



module.exports = { initialize };