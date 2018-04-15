import ProductsService from "./services/ProductsService.js";
import OrdersService from "./services/OrdersService.js";
import MembersService from "./services/MembersService.js";

export default {
  ProductsService: new ProductsService(),
  OrdersService: new OrdersService(),
  MembersService: new MembersService()
};