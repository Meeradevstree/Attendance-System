const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const leaveSchema = new Schema(
{
    total_leave:{
        type: String,
        required: false
    },
    leave_reason:{
        type: String,
        required: true
    },
    // email:{
    //     type: String,
    //     // unique: false,
    //     required: true
    // },
    leave_days:{
        type: String,
        required: false
    },
    leave_approval_date:{
        type: String,
        required: false
    },
    leave_requesting_date:{
        type: String,
        required: false
    },
    from_date:{
        type:String,
        required:false,
        trim:true
    },
    to_date:{
        type:String,
        required:false,
        trim:true
    },
    date:{
        type:String,
        required:false,
        trim:true
    },
    status: {
        type: String,
        enum: ["reject","approved","pending"],
        default: "pending",
        required: false,
    },
    leave_type:{
        type: String,
        enum: ["medical leave","casual leave"],
        default: "casual leave",
        required: false,
    },
    employeeID: {
        type: Schema.Types.ObjectId,
        ref :"Employee"
    },
    employeeid:{
        type: String,
        required: false,
    },
}


);

leaveSchema.plugin(softDelete);

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;