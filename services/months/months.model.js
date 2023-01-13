const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const monthSchema = new Schema(
    {
        january: {
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        february: {
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        march: {
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        april: {
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        may: {
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        june: {
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        july:{
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        august:{
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        september:{
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        october:{
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        november:{
            type: Schema.Types.ObjectId,
            ref :"Date"
        },
        december:{
            type: Schema.Types.ObjectId,
            ref :"Date"
        }
    },
);

monthSchema.plugin(softDelete);

const month = mongoose.model("month", monthSchema);

module.exports = month;