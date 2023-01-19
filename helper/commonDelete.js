const leaveModel = require("../leave/leave.model");
// const attendanceModel = require("../attendance/attendance.model");


if (type == employee){
    await Model.removeOne({_id:id}, {new: true}.select('-employeeID')).lean();
    await leaveModel.removeMany({employeeID: id}, { new: true}).lean();
    // await attendanceModel.removeMany({employeeID: id}, { new: true}).lean();
}