const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        clientName:{
            type: String,
            required: false
        },
        companyName:{
            type: String,
            required: false
        },
        country:{
            type: String,
            required: false
        },
        email:{
            type: String,
            required: false
        },
        mobileNo:{
            type: String,
            required: false
        },
        bdm:[{
            type: Schema.Types.ObjectId,
            ref: "Employee"
        }],
        remark:{
            type: String,
            required: false
        },
    },
);

clientSchema.plugin(softDelete);

const department = mongoose.model("client", clientSchema);

module.exports = department;