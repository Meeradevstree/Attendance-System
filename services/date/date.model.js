const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const dateSchema = new Schema(
    {
        1:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        2:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        3:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        4:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        5:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        6:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        7:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        8:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        9:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        10:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        11:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        12:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        13:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        14:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        15:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        16:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        17:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        18:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        19:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        20:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        21:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        22:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        23:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        24:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        25:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        26:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        27:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        28:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        29:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        30:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
        31:{
            type: Schema.Types.ObjectId,
            ref :"Record"
        },
    },
);

dateSchema.plugin(softDelete);

const Date = mongoose.model("Date", dateSchema);

module.exports = Date;