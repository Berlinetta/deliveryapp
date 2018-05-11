import ApiSdk from "../sdk/ApiSdk";
import Promise from "../packages/bluebird/index";

class BasicInfoService {
    constructor() {
    }

    getLoginCode() {
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (res) {
                    resolve(res.code);
                },
                fail: function () {
                    reject();
                }
            });
        });
    }

    getWechatId() {
        return this.getLoginCode().then((code) => {
            if (!code) {
                return "";
            }
            return ApiSdk.AuthenticationService.getOpenId(code).then((openid) => {
                console.log("wechatid:" + openid);
                return openid;
            });
        }).catch((e) => {
            console.log("getWechatId error: " + e.toString());
            return "";
        });
    }

    authorize() {
        return new Promise(function (resolve, reject) {
            wx.authorize({
                scope: 'scope.userInfo',
                success() {
                    resolve(true);
                },
                fail() {
                    reject(false);
                }
            });
        });
    }

    getWxUserInfo() {
        return new Promise(function (resolve, reject) {
            wx.getUserInfo({
                //withCredentials: true,
                success: res => {
                    resolve(res.userInfo);
                },
                fail: () => {
                    reject({});
                }
            });
        });
    }

    getMyUserInfo() {
        return this.getWechatId().then(function (id) {
            return ApiSdk.MembersService.getMember(id).then(res => {
                if (res.data && res.data.success == "1") {
                    if (res.data.member) {
                        return res.data.member;
                    }
                    //anonymous
                    return {type: "4"};
                }
                return null;
            });
        }).catch((e) => {
            console.log("getMyUserInfo error: " + e.toString());
            return {};
        });
    }

    authorized() {
        return new Promise(function (resolve, reject) {
            wx.getSetting({
                success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                fail: function () {
                    reject(false);
                }
            });
        });
    }
}

const instance = new BasicInfoService();

export default instance;