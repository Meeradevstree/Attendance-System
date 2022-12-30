const moment = require('moment');

exports.getMomentObject = (date, format = "DD-MM-YYYY") => {
  return moment(date, format);
};

exports.getDefaultMessage = () => {
  return {
    title: "Admin Title",
    body: "Admin Body",
    background_img:  process.env.BASE_URL + '/message/default/qr_code.png',
    is_admin: true
  }
};