const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
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
        alternateNo: {
            type: String,
            required: false,
            default: ""
        },
        salary: {
            type: String,
            required: false,
            default: ""
        },
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
        permanent_address:{
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
            type: Number,
            required:false,
            default: 1
        },
        status: {
            type: String,
            enum: ["verified", "pending", "deactivated"],
            default: "pending",
            required: false,
        },
        working:{
            type: String,
            enum: ["work from home","work from office"],
            default: "work from office",
            required: false,
        },
        pancardNo:{
            type: String,
            required: false
        },
        aadharcardNo:{
            type: String,
            required: false
        },
        personalemailId:{
            type: String,
            required: false
        },
        releavingDate:{
            type: String,
            required: false
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);




employeeSchema.plugin(softDelete);

const employee = mongoose.model("Employee", employeeSchema);

module.exports = employee;