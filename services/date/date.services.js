const { commonResponse } = require("../../helper");
const dateModel = require("./date.model");

/*
*  Create
*/
exports.save = async (reqBody) => {
    return await new dateModel(reqBody).save();
};


/*
*  Get Date By Id
*/
exports.get_id = async (id) => {
    return await dateModel.findOne({ _id: id }).populate("1").lean();
    
};

exports.list = async (reqQuery) => {
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

    if (reqQuery.search && reqQuery.search != "") {
        query["date"] = { $regex: new RegExp(".*" + reqQuery.search.toLowerCase(), "i") };
    }

    query.deleted = false;
    returnData.total_counts = await dateModel.countDocuments(query).lean();
    returnData.total_pages = Math.ceil(returnData.total_counts / parseInt(limit));
    returnData.current_page = reqQuery.page ? parseInt(reqQuery.page) : 0;
    returnData.list = await dateModel.find(query).skip(skip).limit(limit).populate("1").populate("2").populate("3").populate("4").populate("5").populate("6").populate("7").populate("8").populate("9").populate("10").populate("11").populate("12").populate("13").populate("14").populate("15").populate("16").populate("17").populate("18").populate("19").populate("20").populate("21").populate("22").populate("23").populate("24").populate("25").populate("26").populate("27").populate("28").populate("29").populate("30").populate("31").lean();

    return returnData;
};


//////////////////////////////////////////////////////////


/*
*  Update
*/
exports.update = async (id, reqBody) => {
    return await dateModel.findOneAndUpdate({_id: id }, {$set:reqBody}, {new: true,}).lean();
};


/*
*  Delete
*/
exports.delete = async (id) => {
    return await dateModel.removeOne({ _id: id },{new: true}).lean();
};