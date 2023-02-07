const {commonResponse} = require('../../helper');
const HolidaysDemo = require('./holidayDemo.model')

//create

exports.create = async (req) => {
    return await new HolidaysDemo(req).save()
}

//get

exports.get = async (reqQuery) => {
    // console.log('reqQuery :',reqQuery)
    let page = 0;
    let limit = 10;
    let skip = 0;
    let returnData = {
        total_counts: 0,
        total_pages: 0,
        current_page: 0,
        list: []
    };
    let query = {};

    if (reqQuery.limit && reqQuery.limit != "") {
        limit = parseInt(reqQuery.limit);
    }

    if (reqQuery.page && reqQuery.page != '') {
        page = parseInt(reqQuery.page) - 1;
        skip = page * limit;
    }

    // if ((reqQuery.search && reqQuery.search != "") || (reqQuery.name && reqQuery.name != "")) {
    //     query = {
    //         $and: [{ "Anime": { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") }}, 
    //         { "mainCharacter": { $regex: new RegExp(".*" + reqQuery.name.toLowerCase(), "i") } }]
    //     }
    // }
    console.log("query ======>: " , query)
    query.deleted = false;

    returnData.total_counts = await HolidaysDemo.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;

    returnData.list = await HolidaysDemo.find(query).sort({_id : -1}).skip(skip).limit(limit).lean();
    return returnData
},

//update

exports.update = async (id, reqBody) => {
    return await HolidaysDemo.findOneAndUpdate({_id: id }, {$set:reqBody}, {new: true,}).lean();
};

//delete

exports.delete = async (id) => {
    return await HolidaysDemo.removeOne({ _id: id }, { new: true }).lean();
};

