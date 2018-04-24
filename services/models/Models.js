const UserType = {
  Seller: "1",
  Dispatcher: "2",
  Driver: "3",
  Anonymous: "4",
  Admin: "5"
};

const UserTypeName = {
  [UserType.Seller]: "销售员",
  [UserType.Dispatcher]: "调度员",
  [UserType.Driver]: "司机",
  [UserType.Anonymous]: "匿名用户",
  [UserType.Admin]: "管理员"
}; 

//1.调度中 2.分配司机 3. 送货中 4.完成 5.现金下单
const OrderStatus = {
    "1": "未调度",
    "2": "调度中",
    "3": "未完成",
    "4": "已完成"
};

const Models = {
  UserType,
  UserTypeName,
  OrderStatus
};

export default Models;