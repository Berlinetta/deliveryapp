import ApiSdk from "../../sdk/ApiSdk";
import AS from '../../business/AuthorizationService.js';
import Util from "../../utils/util.js";
import $wuxLoading from "../../packages/wux/loading/loading";
import Promise from "../../packages/bluebird/index";

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
        },
        modelName: ""
    },
    getModelNameById(modelId) {
        if (!app.globalData.models || app.globalData.models.length == 0) {
            return "";
        }
        const foundItem = app.globalData.models.find(m => m.id.toString() == modelId.toString());
        return foundItem ? foundItem.modelName : "";
    },
    onLoad: function (option) {
        $wuxLoading.show({text: "获取订单信息中..."});
        let orderInfo = JSON.parse(option.orderInfo);
        if (orderInfo.products.length > 0) {
            const modelId = orderInfo.products[0].proModel;
            orderInfo.products[0].proModel = this.getModelNameById(modelId);
        }
        this.setData({orderInfo});
        const promises = {
            drivers: ApiSdk.MembersService.getMemberList("3").then((drivers) => {
                this.setData({drivers});
                this.setData({driverNames: drivers.map(d => d.name)});
            }),
            cars: ApiSdk.CarService.getCars("1").then((cars) => {
                this.setData({cars});
                this.setData({carNumbers: cars.map(c => c.carNumber)});
            })
        };
        Promise.props(promises).then(() => {
            $wuxLoading.hide();
            if (this.data.carNumbers.length < 1) {
                Util.showModal({msg: "暂无可用车辆调度"}, () => {
                    wx.navigateBack();
                });
            }
        });
    },
    onShow: function () {
        app.basicInfoPromise.then(() => {
            this.setData({isDispatcher: AS.isDispatcher()});
        });
    },
    formSubmit(e) {
        // if (!this.wxValidate.checkForm(e)) {
        // 	const error = this.wxValidate.errorList[0];
        // 	Util.showModal(error);
        // 	return false;
        // }
        const {car, driver} = e.detail.value;
        const {drivers, cars, orderInfo} = this.data;
        const data = {
            orderId: orderInfo.id,
            driverId: drivers[driver].id,
            driverName: drivers[driver].name,
            vehicleId: cars[car].id,
            carNumber: cars[car].carNumber
        };
        ApiSdk.OrdersService.dispatchOrder(data).then(() => {
            Util.showModal({msg: "调度成功"}, () => {
                wx.navigateBack();
            });
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