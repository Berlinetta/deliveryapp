import BaseService from "./BaseService.js";

class OrdersService extends BaseService {
    getOrderProducts(orderNumber) {
        const data = {ordNumber: orderNumber};
        return this.getRequest('/orderApi/orderDetailList.shtml', data);
    }

    getPagedOrders(options) {
        return this.getRequest('/orderApi/orderList.shtml', options).then((res) => {
            if (res.data && res.data.success == "1") {
                const orders = res.data.orderList.map((o) => {
                    return this.getOrderProducts(o.ordNumber).then((opRes) => {
                        if (opRes.data && opRes.data.success == "1") {
                            return Object.assign({}, o, {products: opRes.data.orderDetailList});
                        }
                        return Object.assign({getModels}, o, {products: []});
                    });
                });
                return Object.assign({}, res.data, {orders});
            }
            return {orders: []};
        });
    }

    createOrder(orderInfo) {
        return this.postRequest('/orderApi/saleSaveOrder.shtml', orderInfo);
    }

    dispatchOrder(orderInfo) {
        return this.postRequest('/orderApi/saveDriver.shtml', orderInfo);
    }
}

export default OrdersService;