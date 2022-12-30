const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const leaveSchema = new Schema(
{
    total_leave:{
        type: String,
        required: true
    },
    leave_reason:{
        type: String,
        required: true
    },
    leave_days:{
        type: String,
        required: true
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
        required:true,
        trim:true
    },
    to_date:{
        type:String,
        required:true,
        trim:true
    },
    status: {
        type: String,
        enum: ["reject","approved","panding"],
        default: "panding",
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
}


);

leaveSchema.plugin(softDelete);

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;