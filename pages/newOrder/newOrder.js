import moment from "../../packages/moment/moment.min.js";
import WxValidate from "../../packages/wx-validate/WxValidate.js";
import ApiSdk from "../../sdk/ApiSdk.js";
import Util from "../../utils/util.js";

const app = getApp();

Page({
	data: {
		currentDate: moment().format('YYYY-MM-DD'),
		cargoTypes: [],
		cargoTypeIndex: 0,
		cargoModels: [],
		cargoModelIndex: 0,
		cargoUnit: "",
		cargoPrice: 0,
		cargoCount: 0,
		payTypes: ["线上支付", "线下支付"],
		payTypeIndex: 0,
		date: moment().add(1, 'days').format('YYYY-MM-DD'),
		tel: {
			countryCodeIndex: 0,
			number: ""
		}
	},
	onLoad(options) {
		this.initValidate();
		const { products } = app.globalData;
		this.setData({ cargoTypes: products.map((p) => p.proName) });
		this.selectProduct(this.data.cargoTypeIndex);
	},
	formSubmit(e) {
		if (!this.wxValidate.checkForm(e)) {
			const error = this.wxValidate.errorList[0];
			Util.showModal(error);
			return false;
		}
		//all fields in UI: arrivalDate, cargoCount, cargoModel, cargoUnit, consigneeTelephone, 
		//constructionSiteAddress, constructionSiteName, constructorCompanyName, payType, submissionDateTime

		const { arrivalDate, cargoCount, cargoModel, cargoUnit, consigneeTelephone, constructionSiteAddress, payType, submissionDateTime } = e.detail.value;
		const selectedProduct = app.globalData.products[this.data.cargoTypeIndex];
		const totalPrice = parseFloat(this.data.cargoPrice) * parseFloat(cargoCount);
		const orderInfo = {
			wechatId: app.globalData.wechatId,
			ordAddress: constructionSiteAddress,
			orderDetail: [{
				payType: parseInt(payType) + 1,
				productId: selectedProduct.id,
				productName: selectedProduct.proName,
				proNum: cargoCount,
				proPrice: selectedProduct.proPrice,
				proSumPrice: totalPrice,
				proModel: selectedProduct.proModel
			}],
		};
		ApiSdk.OrdersService.createOrder(orderInfo).then(() => {
			Util.showModal({ msg: "提交成功" }, () => { wx.navigateBack(); });
		}).catch((res) => {
			Util.showModal({
				msg: "提交失败！错误详情：" + res.toString()
			});
		});
	},
	cancelSubmit(event) {
		wx.navigateBack();
	},
	initValidate() {
		const rules = {
			arrivalDate: {
				required: true
			},
			// constructionSiteName: {
			//   required: true
			// },
			cargoType: {
				required: true
			},
			cargoModel: {
				required: true
			},
			cargoCount: {
				required: true
			},
			consigneeTelephone: {
				telephoneRequired: true,
				telephone: true
			}
		};
		const messages = {
			arrivalDate: {
				required: "请输入到货日"
			},
			// constructionSiteName: {
			//   required: "请输入工地名称"
			// },
			cargoType: {
				required: "请输入货物种类"
			},
			cargoModel: {
				required: "请输入货物型号"
			},
			cargoCount: {
				required: "请输入货物数量"
			},
			consigneeTelephone: {
				telephoneRequired: "请输入收货人电话",
				telephone: "请输入正确的收货人电话"
			}
		};
		this.wxValidate = new WxValidate(rules, messages);
		this.wxValidate.addMethod("telephoneRequired", (value, param) => {
			return value.number !== "";
		}, "请输入号码");
		this.wxValidate.addMethod("telephone", (value, param) => {
			return value && this.wxValidate.methods.tel(value.number);
		}, "请输入正确的号码");
	},
	selectProduct(productIndex) {
		const { products } = app.globalData;
		const selectedProduct = products[productIndex];
		this.setData({ cargoTypeIndex: productIndex, cargoModels: [selectedProduct.proModel], cargoUnit: selectedProduct.proUnit, cargoPrice: selectedProduct.proPrice });
	},
	handleCargoTypeChange(e) {
		this.selectProduct(e.detail);
	}
});