const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const dashboardSchema = new Schema(
    {
        total_employee: {
            type: String,
            required: false
        },
        present: {
            type: String,
            required: false
        },
        absent: {
            type: String,
            required: false
        },
        leave_apply: {
            type: String,
            required: false
        },
    },
);

dashboardSchema.plugin(softDelete);

const dashboard = mongoose.model("dashboard", dashboardSchema);

module.exports = dashboard;