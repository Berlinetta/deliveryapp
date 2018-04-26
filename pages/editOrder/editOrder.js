import ApiSdk from "../../sdk/ApiSdk";
import AuthorizationService from '../../services/AuthorizationService.js';
import Util from "../../utils/util.js";

const app = getApp();

Page({
	data: {
		isDispatcher: false,
		isDriver: false,
		orderFailed: true,
		driverNames: [],
		driverIndex: 0,
		orderStatusArr: ["调度中", "未完成", "已完成"],
		orderStatusIndex: 0,
		carNumbers: [],
		carNumberIndex: 0,
		cars: [],
		orderInfo: {
			title: "",
			ordAddress: "",
			products: [{
				proModel: "",
				proNum: 0
			}]
		}
	},
	onLoad: function (option) {
		const orderInfo = JSON.parse(option.orderInfo);
		this.setData({ orderInfo });
		ApiSdk.MembersService.getMemberList("3").then((drivers) => {
			this.setData({ drivers });
			this.setData({ driverNames: drivers.map(d => d.name) });
		});
		ApiSdk.CarService.getCars("1").then((cars) => {
			this.setData({ cars });
			this.setData({ carNumbers: cars.map(c => c.carNumber) });
		});
	},
	onShow: function () {
		const AS = new AuthorizationService();
		this.setData({ isDispatcher: AS.isDispatcher() });
	},
	formSubmit(e) {
		// if (!this.wxValidate.checkForm(e)) {
		// 	const error = this.wxValidate.errorList[0];
		// 	Util.showModal(error);
		// 	return false;
		// }
		const { car, driver } = e.detail.value;
		const { drivers, cars, orderInfo } = this.data;
		const data = {
			orderId: orderInfo.ordNumber,
			driverId: drivers[driver].id,
			driverName: drivers[driver].name,
			vehicleId: cars[car].id,
			carNumber: cars[car].carNumber
		};
		ApiSdk.OrdersService.dispatchOrder(data).then(() => {
			Util.showModal({ msg: "调度成功" }, () => { wx.navigateBack(); });
		}).catch((res) => {
			Util.showModal({
				msg: "调度失败！错误详情：" + res.toString()
			});
		});
	},
	cancelSubmit(event) {
		wx.navigateBack();
	}
});