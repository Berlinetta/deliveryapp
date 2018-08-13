import AS from '../../business/AuthorizationService.js';
import Models from '../../business/models/Models.js';
import Constants from '../../business/models/Constants.js';
import Util from "../../utils/util.js";
import BasicInfoService from "../../business/BasicInfoService";

const app = getApp();

Page({
    data: {
        manageActions: [
            {imageUrl: '../../resources/icons/manage/sales.png', text: "销售人员", url: "../manageSellers/manageSellers"},
            {
                imageUrl: '../../resources/icons/manage/dispacthers.png',
                text: "调度人员",
                url: "../manageDispatchers/manageDispatchers"
            },
            {imageUrl: '../../resources/icons/manage/drivers.png', text: "物流人员", url: ""},
            {imageUrl: '../../resources/icons/manage/goods.png', text: "产品", url: "../manageProducts/manageProducts"},
            {imageUrl: '../../resources/icons/manage/car.png', text: "车辆", url: "../manageCars/manageCars"},
            {imageUrl: '../../resources/icons/manage/money.png', text: "运费", url: "../manageFees/manageFees"}
        ],
        urls: [],
        wxUserInfo: {},
        myUserInfo: {},
        isAdmin: false,
        isSeller: false,
        isAnonymous: true
    },
    onLoad: function () {
    },
    onShow: function () {
        app.basicInfoPromise.then(() => {
            BasicInfoService.getMyUserInfo().then((res) => {
                app.globalData.myUserInfo = res;
                const {authorized} = app.globalData;
                if (!authorized) {
                    wx.navigateTo({
                        url: '../authorize/authorize'
                    });
                } else {
                    this.setData({isAdmin: AS.isAdmin()});
                    this.setData({isAnonymous: AS.isAnonymous()});
                    this.setData({isSeller: AS.isSeller() || AS.isAdmin()});
                    if (AS.isAnonymous()) {
                        Util.showModal({msg: Constants.PleaseRegister}, () => {
                            wx.navigateTo({
                                url: '../newMember/newMember'
                            })
                        });
                    } else {
                        const {wxUserInfo, myUserInfo} = app.globalData;
                        const userTypeName = Models.UserTypeName[myUserInfo.type];
                        this.setData({wxUserInfo, myUserInfo: Object.assign({}, myUserInfo, {userTypeName})});
                        this.setData({urls: this.data.manageActions.map(a => a.url)});
                    }
                }
            });
        });
    }
});
