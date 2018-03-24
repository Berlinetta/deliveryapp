var moment = require("../../packages/moment.min.js");

Page({
  data: {
    currentDate: moment().format('YYYY-MM-DD hh:mm:ss'),
    cargoTypes: ["货物1", "货物2", "货物3"],
    cargoTypeIndex: 2,
    cargoModels: ["型号1", "型号2", "型号3"],
    cargoModelIndex: 1,
    cargoCounts: ["10", "20", "30"],
    cargoCountIndex: 0,
    date: "2018-3-13",
    time: "09:30",
    tel: {
      countryCodeIndex: 0,
      number: "1345555555"
    }
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },
  formSubmit: function (event) {
    console.log(event.detail.value.consigneeTelephone);
  }
})