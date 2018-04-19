Page({
  data: {
    isDispatcher: false,
    isDriver: true,
    orderFailed: true,
    drivers: ["张三", "李四", "王五"],
    driverIndex: 0,
    orderStatusArr: ["调度中", "未完成", "已完成"],
    orderStatusIndex: 0
  },
  onLoad: function (option) {
    console.log(option.ordNumber);
  }
});