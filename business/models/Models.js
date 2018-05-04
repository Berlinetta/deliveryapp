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

const OrderStatus = {
    "1": "未调度",
    "2": "送货中",
    "3": "未完成",
    "4": "已完成",
    "5": "售后"
};

const Models = {
  UserType,
  UserTypeName,
  OrderStatus
};

export default Models;