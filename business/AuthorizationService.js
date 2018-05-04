import Models from "./models/Models.js";

class AuthorizationService {
    constructor() {
    }

    isUserType(userType) {
        const app = getApp();
        const myUserInfo = app.globalData.myUserInfo;
        if (myUserInfo) {
            return app.globalData.myUserInfo.type == userType;
        }
        return false;
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

const instance = new AuthorizationService();

export default instance;