import BaseService from "./BaseService.js";

class ProductsService extends BaseService {
  getProducts() {
    return this.getRequest('/productApi/productList.shtml').then(res => {
      console.log(res);
      return res;
    });
  }
}

export default ProductsService;