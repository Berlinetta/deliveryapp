var moment = require("../../packages/moment.min.js");
//var utils = require("../../utils/util.js");

Page({
  data: {
    currentDate: moment().format('YYYY-MM-DD hh:mm:ss'),
    goodTypes: ["货物1", "货物2", "货物3"],
    goodTypeIndex: 0,
    goodModels: ["型号1", "型号2", "型号3"],
    goodModelIndex: 0,
    goodCounts: ["10", "20", "30"],
    goodCountIndex: 0
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
    console.log(event)
  }
})