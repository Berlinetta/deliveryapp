import BaseService from "./BaseService.js";

class AddressService extends BaseService {
    getAddresses() {
        return this.getRequest('/sitesApi/findList.shtml').then((res) => {
            if (res.data && res.data.success == "1") {
                return res.data.resultList && res.data.resultList.length > 0 ? res.data.resultList : [];
            }
            return [];
        });
    }
}

export default AddressService;