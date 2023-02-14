const { commonResponse } = require("../../helper");
const moment = require("moment")
const dateModel = require("./date.model");
const leaveData = require("../leave/leave.model")

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
    return await dateModel.findOne({ _id: id }).populate("employeeID").lean();

};

exports.list = async (reqQuery) => {
    let page = 0;
    let limit = 100;
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
    returnData.list = await dateModel.find(query).skip(skip).limit(limit).populate("employeeID").lean();

    return returnData;
};


//////////////////////////////////////////////////////////


/*
*  Update
*/
exports.update = async (id, reqBody) => {
    const data = await leaveData.find({ employeeid: reqBody.employeeID }).sort({ _id: -1 }).lean()

    if (data.length > 0 && data[0].status === 'Approved') {
        const startDate = moment(data[0].from_date, 'YYYY-MM-DD').format('DD');
        const endDate = moment(data[0].to_date, 'YYYY-MM-DD').format('DD');

        const startMonth = moment(data[0].from_date, 'YYYY-MM-DD').format('MM');
        const endMonth = moment(data[0].to_date, 'YYYY-MM-DD').format('MM');

        const datesArray = [];
        const newMonthDatesArray = []
        let reqBody2 = {}

        const start = moment([2023, startMonth - 1]).startOf('month');
        const end = moment(start).endOf('month').format('D');

        const getWeekends = (year, month) => {
            const start = moment([year, startMonth - 1]).startOf('month');
            const end = moment(start).endOf('month');
            const weekends = [];

            for (const i = moment(start); i.isBefore(end); i.add(1, 'days')) {
                if (i.day() === 0 || i.day() === 6) {
                    weekends.push(i.format('D'));
                }
            }
            // || i.day() === 6
            return weekends;
        }
        const weekEnd = getWeekends(2023)
        if (data[0].leave_type == 'full day') {
            if (startMonth == endMonth) {
                for (let date = startDate; date <= endDate; date++) {
                    datesArray.push({
                        [`${moment(date, 'DD').format('D')}`]: 'a'
                    });
                }
            } else {
                for (let date = startDate; date <= end; date++) {
                    datesArray.push({
                        [`${moment(date, 'DD').format('D')}`]: 'a'
                    });
                }
                // for (let date = 1; date <= endDate; date++) {
                //     newMonthDatesArray.push({
                //         [`${moment(date, 'DD').format('D')}`]: 'a'
                //     });
                // }
            }
        } else if (data[0].leave_type == 'half day') {
            datesArray.push({
                [`${moment(startDate, 'DD').format('D')}`]: 'h-l'
            })
        } else { }

        datesArray.map((d) => {
            Object.entries(d).map(([key, value]) => {
                if (weekEnd.includes(key)) {
                    reqBody[key] = ''
                } else {
                    reqBody[key] = value
                }
            })
        })

        console.log('monthhhhhhhhhh: ', reqBody)

        if (newMonthDatesArray.length > 0) {
            // newMonthDatesArray.map((d) => {
            //     Object.entries(d).map(([key, value]) => {
            //         if (weekEnd.includes(key)) {
                        
            //         } else {
            //             reqBody2[key] = value
            //         }
            //     })
            // })
            // reqBody2.employeeID = reqBody.employeeID
            // reqBody2.month = moment(endMonth, "MM").format('MMMM')
            
            // let example = await new dateModel(reqBody2).save();
            // let getId = await dateModel.findOne({ employeeid: reqBody2.employeeId }).sort({_id:-1}).lean()
            // let finalData =  await dateModel.findOneAndUpdate({ _id: getId._id }, { $set: reqBody2 }, { new: true, }).lean();
            // let finalData2 =  await dateModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true, }).lean();
            // console.log('finalData ": ',getId._id)

        } else {
            return await dateModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true, }).lean();
        }


    } else {
        console.log('elseeeeeeeeeeeeeeee')
        return await dateModel.findOneAndUpdate({ _id: id }, { $set: reqBody }, { new: true, }).lean();
    }
};


/*
*  Delete
*/
exports.delete = async (id) => {
    return await dateModel.removeOne({ _id: id }, { new: true }).lean();
};