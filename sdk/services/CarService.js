import BaseService from "./BaseService.js";

class CarService extends BaseService {
	getCars(status) {
		const data = { status };
		return this.getRequest('/vehicleApi/getVehicleList.shtml', data).then((res) => {
			if (res.data && res.data.success == "1") {
				return res.data.vehicleList && res.data.vehicleList.length > 0 ? res.data.vehicleList : [];
			}
			return [];
		});
	}
}

export default CarService;