const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const roleSchema = new Schema(
    {
        title: {
            type: String,
            required: false
        },
        login_type: {
            type: String,
            enum: ["ceo","director", "hr", "sub-hr", "pm", "tl", "sd", "developer","president","bd"],
            required: false
        },
        member: [{
            type: String,
            enum: ['add', 'edit', 'view', 'delete'],
            default: []
        }],
        dashboard:[{
            type: String,
            enum: ['add', 'edit', 'view', 'delete'],
            default: []
        }],
        leave:[{
            type: String,
            enum: ['add', 'edit', 'view', 'delete'],
            default: []
        }],
        roleManagement:[{
            type: String,
            enum: ['add', 'edit', 'view', 'delete'],
            default: []
        }],
        holidays:[{
            type: String,
            enum: ['add', 'edit', 'view', 'delete'],
            default: []
        }],
        department:[{
            type: String,
            enum: ['add', 'edit', 'view', 'delete'],
            default: []
        }],
        sub_department:[{
            type: String,
            enum: ['add', 'edit', 'view', 'delete'],
            default: []
        }],
        sheet:[{
            type: String,
            enum: ['add', 'edit', 'view', 'delete'],
            default: []
        }],
        attendance:[{
            type: String,
            enum: ['add', 'edit', 'view', 'delete'],
            default: []
        }],
    }
);

roleSchema.plugin(softDelete);

const Role = mongoose.model("Role", roleSchema);
// Role.readSpecificKeyValueDemo.find({},{"StudentDetails.StudentCountryName":1}).pretty();
module.exports = Role;