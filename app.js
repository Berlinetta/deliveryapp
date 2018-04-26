import ApiSdk from "./sdk/ApiSdk";

App({
	onLaunch: function () {
		const that = this;
		wx.login({
			success: function (res) {
				if (res.code) {
					const openIdPromise = ApiSdk.AuthenticationService.getOpenId(res.code).then((openid) => {
						console.log("wechatid:" + openid);
						//that.globalData.wechatId = openid;
					}).then(function () {
						const myUserInfoPromise = ApiSdk.MembersService.getMember(that.globalData.wechatId).then(res => {
							if (res.data && res.data.success == "1") {
								that.globalData.myUserInfo = res.data.member;
							}
						});
						that.globalData.myUserInfoPromise = myUserInfoPromise;
						global.globalData = that.globalData;
					});
					that.globalData.openIdPromise = openIdPromise;
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
		wechatId: "2001",//2001:销售 2002:调度 2003:司机
		wxUserInfo: null,
		myUserInfo: null,
		products: []
	},
	openIdPromise: null,
	myUserInfoPromise: null
})