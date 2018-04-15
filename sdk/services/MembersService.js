import BaseService from "./BaseService.js";

class MembersService extends BaseService {
  createMember(wechatId, name, phone, membertype) {
    const memberInfo = { wechatId, name, phone, type: membertype };
    return this.postRequest('/memberApi/memberAdd.shtml', memberInfo);
  }

  getMember(wechatId) {
    return this.getRequest('/memberApi/memberInfo.shtml', { wechatId });
  }
}

export default MembersService;