const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        email: {
            type: String,
            // unique: false,
            required: true
        },
        first_name: {
            type: String,
            required: false
        },
        last_name: {
            type: String,
            required:false
        },
        phoneNo: {
            type: String,
            required: false,
            default: ""
        },
        // otherNo: {
        //     type: String,
        //     required: false,
        //     default: ""
        // },
        birthdate:{
            type:String,
            required:false,
            trim:true
        },
        age:{
            type: String,
            required: false,
        },
        departmentdata: {
            type: Schema.Types.ObjectId,
            ref :"department"
        },
        department:{
            type: String,
            required: false,
        },
        parmenant_address:{
            type: String,
            required: false
        },
        temparory_address:{
            type: String,
            required: false
        },
        city:{
            type: String,
            required: false
        },
        gender:{
            type: String,
            enum: ["male","female","other"],
            default: "other",
            required: false,
        },
        password: {
            type: String,
            required: true
        },
        joiningdate:{
            type:String,
            required:false,
            trim:true
        },
        image: {
            type: String,
            required: false,
            default: ""
        },
        roleManagement: {
            type: Schema.Types.ObjectId,
            ref :"Role"
        },
        role:{
            type: String,
            required: false,
        },
        otp: {
            type: Number,
            required: false,
            default: 0
        },
        employeeNo:{
            type: String,
            required: false
        },
        status: {
            type: String,
            enum: ["verified", "pending", "deactivated"],
            default: "pending",
            required: false,
        },
        linkedIn:{
            type: String,
            required: false
        },
        skype:{
            type: String,
            required: false
        },
        github:{
            type: String,
            required: false
        }
        
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);




usersSchema.plugin(softDelete);

const Users = mongoose.model("Employee", usersSchema);

module.exports = Users;