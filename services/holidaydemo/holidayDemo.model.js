
const mongoose = require('mongoose')
let softDelete = require('mongoosejs-soft-delete')

const Schema = mongoose.Schema;

const HolidayDemoSchema = new Schema(
    {
        Anime: {
            type: String,
            required: true,
        },
        Unique: {
            type: Number,
            required: false,
            default: 1
        },
        mainCharacter: {
            type: String,
            required: true,
        },
        episodes: {
            type: Number,
            required: true,
        },
        genre: {
            type: String,
            enum: ["action", "sci-fi", "romantic", "slice-of-life"],
            default: "action",
            required: false,
        },
        rating: {
            type: Number,
            required: true,
        },
        employee: {
            type:Schema.Types.ObjectId,
            ref : "Employee"
        }
    }
)

HolidayDemoSchema.plugin(softDelete)
const HolidaysDemo = mongoose.model('HolidaysDemo', HolidayDemoSchema)
module.exports = HolidaysDemo