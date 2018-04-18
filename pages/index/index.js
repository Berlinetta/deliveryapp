import AuthorizationService from '../../services/AuthorizationService.js';
import Models from '../../services/models/Models.js';

const app = getApp();

Page({
  data: {
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    manageActions: [
      { imageUrl: '../../resources/icons/manage/sales.png', text: "销售人员", url: "../manageSellers/manageSellers" },
      { imageUrl: '../../resources/icons/manage/dispacthers.png', text: "调度人员", url: "../manageDispatchers/manageDispatchers" },
      { imageUrl: '../../resources/icons/manage/drivers.png', text: "物流人员", url: "" },
      { imageUrl: '../../resources/icons/manage/goods.png', text: "产品", url: "../manageProducts/manageProducts" },
      { imageUrl: '../../resources/icons/manage/car.png', text: "车辆", url: "../manageCars/manageCars" },
      { imageUrl: '../../resources/icons/manage/money.png', text: "运费", url: "../manageFees/manageFees" }
    ],
    urls: [],
    wxUserInfo: {},
    myUserInfo: {},
    isAdmin: true,
    isSeller: true
  },
  onLoad: function () {
    const AS = new AuthorizationService();
    const { wxUserInfo, myUserInfo } = app.globalData;
    //this.setData({ isAdmin: AS.isAdmin() });
    //this.setData({ isSeller: AS.isSeller() || AS.isAdmin() });
    const userTypeName = Models.UserTypeName[myUserInfo.type];
    this.setData({ wxUserInfo, myUserInfo: Object.assign({}, myUserInfo, { userTypeName }) });
    this.setData({ urls: this.data.manageActions.map(a => a.url) });
  }
});
