import BaseService from "./BaseService.js";

class AuthenticationService extends BaseService {
    getOpenId(code) {
        const appid = "wx00b4c13546d40be1";//jacky: wxa1d1f519b7d51fc7
        const secret = "057d712f1b693d37a336380b45adc2bf";//jacky: 4d2d87a85cbfb470eda7a05224c5b9a5
        return this.getRequest('/weiXinApi/getWXOpenId.shtml', {code, appid, secret}).then((res) => {
            if (res && res.data && res.data.openid) {
                return res.data.openid;
            }
            return "";
        }).catch((e) => {
            console.log("getOpenId error:" + e.toString());
            return "";
        });
    }
}

export default AuthenticationService;