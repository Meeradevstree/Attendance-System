const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const dashboardSchema = new Schema(
    {
        
    },
);

dashboardSchema.plugin(softDelete);

const dashboard = mongoose.model("dashboard", dashboardSchema);

module.exports = dashboard;