import BaseService from "./BaseService.js";

class OrdersService extends BaseService {
  getOrderProducts(orderNumber) {
    const data = { OrdNumber: orderNumber };
    return this.getRequest('/orderApi/orderDetailList.shtml', data);
  }

  getPagedOrders(orderStatus, pageSize, pageNow) {
    const data = { ordStatus: orderStatus, pageSize, pageNow };
    return this.getRequest('/orderApi/orderList.shtml', data);
  }

  createOrder(orderInfo) {
    return this.postRequest('/orderApi/saleSaveOrder.shtml', orderInfo);
  }
}

export default OrdersService;