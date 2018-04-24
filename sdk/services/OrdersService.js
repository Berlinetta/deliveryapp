import BaseService from "./BaseService.js";

class OrdersService extends BaseService {
    getOrderProducts(orderNumber) {
        const data = { ordNumber: orderNumber };
        return this.getRequest('/orderApi/orderDetailList.shtml', data);
    }

    getPagedOrders(orderStatus, pageSize, pageNow) {
        const data = { ordStatus: orderStatus, pageSize, pageNow };
        return this.getRequest('/orderApi/orderList.shtml', data).then((res) => {
            if (res.data && res.data.success == "1") {
                const orders = res.data.orderList.map((o) => {
                    return this.getOrderProducts(o.ordNumber).then((opRes) => {
                        if (opRes.data && opRes.data.success == "1") {
                            return Object.assign({}, o, { products: opRes.data.orderDetailList });
                        }
                        return Object.assign({}, o, { products: [] });
                    });
                });
                return orders;
            }
            return [];
        });
    }

    createOrder(orderInfo) {
        return this.postRequest('/orderApi/saleSaveOrder.shtml', orderInfo);
    }
}

export default OrdersService;