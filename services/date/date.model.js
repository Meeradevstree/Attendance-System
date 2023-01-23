const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const dateSchema = new Schema(
    {
        1:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        2:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        3:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        4:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        5:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        6:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        7:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        8:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        9:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        10:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        11:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        12:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        13:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        14:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        15:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        16:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        17:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        18:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        19:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        20:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        21:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        22:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        23:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        24:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        25:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        26:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        27:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        28:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        29:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        30:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        31:{
            type: String,
            enum: ["a","p","h-l"],
            // default: "p",
            required: false,
        },
        employeeID: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        }
    },
);

dateSchema.plugin(softDelete);

const Date = mongoose.model("Date", dateSchema);

module.exports = Date;