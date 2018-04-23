import Models from "./models/Models.js";

class AuthorizationService {
  constructor() {
    this.app = getApp();
  }

  isUserType(userType) {
    return this.app.globalData.myUserInfo.type == userType;
  }

  isAdmin() {
    return this.isUserType(Models.UserType.Admin);
  }

  isDispatcher() {
    return this.isUserType(Models.UserType.Dispatcher);
  }

  isSeller() {
    return this.isUserType(Models.UserType.Seller);
  }

  isDriver() {
    return this.isUserType(Models.UserType.Driver);
  }

  isAnonymous() {
    return this.isUserType(Models.UserType.Anonymous);
  }
}

//const instance = new AuthorizationService();

export default AuthorizationService;