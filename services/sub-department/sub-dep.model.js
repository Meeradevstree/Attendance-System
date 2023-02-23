const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const sub_depSchema = new Schema(
    {
        sub_dep_name:[{
            type: String,
            required: false
        }],
    },
);

sub_depSchema.plugin(softDelete);

const sub_dep = mongoose.model("sub_dep", sub_depSchema);

module.exports = sub_dep;