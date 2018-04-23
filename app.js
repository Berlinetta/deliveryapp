import ApiSdk from "./sdk/ApiSdk";

App({
	onLaunch: function () {
		const that = this;
		wx.login({
			success: function (res) {
				if (res.code) {
					ApiSdk.AuthenticationService.getOpenId(res.code).then((openid) => {
						console.log("wechatid:" + openid);
						that.globalData.wechatId = openid;
					}).then(function () {
						ApiSdk.MembersService.getMember(that.globalData.wechatId).then(res => {
							if (res.data && res.data.success == "1") {
								that.globalData.myUserInfo = res.data.member;
							}
						});
						//todo: for debugging.
						global.globalData = that.globalData;
					});
				}
			}
		});
		wx.getUserInfo({
			success: res => {
				that.globalData.wxUserInfo = res.userInfo;
			}
		});
		ApiSdk.ProductsService.getProducts().then(res => {
			if (res.data && res.data.success == "1") {
				that.globalData.products = res.data.productList;
			}
		});
	},
	globalData: {
		wechatId: "",
		wxUserInfo: null,
		myUserInfo: null,
		products: []
	}
})