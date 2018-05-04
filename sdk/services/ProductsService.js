import BaseService from "./BaseService.js";

class ProductsService extends BaseService {
    getProducts() {
        return this.getRequest('/productApi/productList.shtml').then(res => {
            if (res.data && res.data.success == "1") {
                return res.data.productList;
            }
            return [];
        });
    }

    getModels() {
        return this.getRequest('/productApi/productModelList.shtml').then(res => {
            if (res.data && res.data.success == "1") {
                return res.data.productModelList;
            }
            return [];
        });
    }
}

export default ProductsService;