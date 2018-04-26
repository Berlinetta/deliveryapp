import BaseService from "./BaseService.js";

class MembersService extends BaseService {
	createMember(wechatId, name, phone, membertype) {
		const memberInfo = { wechatId, name, phone, type: membertype };
		return this.postRequest('/memberApi/memberAdd.shtml', memberInfo);
	}

	getMember(wechatId) {
		return this.getRequest('/memberApi/memberInfo.shtml', { wechatId });
	}

	//1销售 2调度 3司机 4普通
	getMemberList(userType) {
		return this.getRequest('/memberApi/getMemberList.shtml', { type: userType }).then((res) => {
			if (res.data && res.data.success == "1") {
				return res.data.memberList;
			}
			return [];
		});
	}
}

export default MembersService;