var moment =  require("../../packages/moment.min.js");
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})