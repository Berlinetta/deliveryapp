import { $wuxFilterBar, $wuxRefresher } from '../../packages/wux/wux.js'
import ApiSdk from "../../sdk/ApiSdk";
import Models from "../../business/models/Models.js";
import Util from "../../utils/util.js";
import AS from '../../business/AuthorizationService.js';
import Promise from "../../packages/bluebird/index";

const app = getApp();

Page({
    data: {
        canEditOrder: false,
        previewItems: [
            { label: "型号", value: "" },
            { label: "数量", value: "" },
            { label: "配送至", value: "" },
            { label: "到货时间", value: "" },
            { label: "订单状态", value: "" }
        ],
        items: [
            {
                type: 'radio',
                label: '状态',
                value: 'orderStatus',
                children: [{
                    label: '未调度',
                    value: "1",
                    checked: true
                },
                {
                    label: '配送中',
                    value: "2"
                },
                {
                    label: '已完成',
                    value: "3"
                },
                {
                    label: '未完成',
                    value: "4"
                }
                ],
                groups: ["1"]
            },
            {
                type: 'sort',
                label: '创建时间',
                value: 'creationTime',
                sort: -1,
                groups: ["2"]
            },
            {
                type: 'filter',
                label: '筛选',
                value: 'filter',
                children: [{
                    type: 'radio',
                    label: '状态',
                    value: 'orderStatus',
                    children: [{
                        label: '未调度',
                        value: "1",
                        checked: true
                    },
                    {
                        label: '配送中',
                        value: "2"
                    },
                    {
                        label: '已完成',
                        value: "3"
                    },
                    {
                        label: '未完成',
                        value: "4"
                    }
                    ],
                },
                {
                    type: 'radio',
                    label: '创建时间',
                    value: 'creationTime',
                    children: [{
                        label: '升序',
                        value: '1'
                    }, {
                        label: '降序',
                        value: '2'
                    }]
                }
                ],
                groups: ['001', '002']
            }
        ],
        tableData: [],
        showPager: false,
        ordStatus: "1",
        sortType: "2",//1: asc, 2: desc
        pageSize: 10,
        pageIndex: 0,//starts from 0, be consistent with iPager
        totalCount: 0
    },
    getQueryObj() {
        const { memberId } = app.globalData.myUserInfo;
        const { ordStatus, sortType, pageIndex, pageSize } = this.data;
        const basicParam = { ordStatus, sortType, pageNow: pageIndex + 1, pageSize };
        if (AS.isSeller() || AS.isDriver()) {
            const memberType = AS.isSeller() ? "1" : "2";
            return Object.assign({}, basicParam, { memberId, memberType });
        }
        return basicParam;
    },
    refreshFilterBar(items) {
        const { ordStatus, sortType } = this.data;
        //reset orderStatus
        const orderStatusF = items.find((o) => o.value == "orderStatus");
        let orderStatusIndex = orderStatusF.children.findIndex((o) => o.value.toString() == ordStatus.toString());
        orderStatusIndex = orderStatusIndex == -1 ? 0 : orderStatusIndex;
        orderStatusF.children.forEach((c, index) => {
            orderStatusF.children[index].checked = index == orderStatusIndex;
        });
        //reset creationTime
        const creationTimeF = items.find((o) => o.value == "creationTime");
        creationTimeF.sort = sortType.toString() == "1" ? 1 : -1;
        //reset filter
        const filterF = items.find((o) => o.value == "filter");
        const osF = filterF.children.find((o) => o.value == "orderStatus");
        osF.children.forEach((c, index) => {
            osF.children[index].checked = index == orderStatusIndex;
        });
        const ctF = filterF.children.find((o) => o.value == "creationTime");
        const ctIndex = sortType.toString() == "1" ? 0 : 1;
        ctF.children.forEach((c, index) => {
            ctF.children[index].checked = index == ctIndex;
        });
    },
    initData() {
        return app.basicInfoPromise.then(() => {
            ApiSdk.OrdersService.getPagedOrders(this.getQueryObj())
                .then((data) => {
                    const { orders, pageSize, pageNow, sumSize } = data;
                    this.setData({ totalCount: parseInt(sumSize) });
                    this.setData({ showPager: parseInt(sumSize) > this.data.pageSize });
                    Promise.all(orders).then((ordersData) => {
                        const tableData = ordersData.map((o) => {
                            let productName = "#";
                            if (o.products && o.products.length > 0) {
                                productName = o.products[0].productName;
                            }
                            const od = Object.assign({}, o, {
                                title: productName,
                                subtitle: "",
                                previewing: false
                            });
                            return od;
                        });
                        this.setData({ tableData });
                    });
                });
            this.setData({ canEditOrder: (AS.isAdmin() || AS.isDispatcher()) });
        });
    },
    onLoad() {
        this.filterBar = $wuxFilterBar.init({
            items: this.data.items,
            onNotChange: (checkedItems, items) => {
                this.refreshFilterBar(items);
            },
            onChange: (checkedItems, items) => {
                let changed = false;
                checkedItems.forEach((n) => {
                    if (n.checked) {
                        if (n.value === 'orderStatus') {
                            const checkedItem = n.children.find((o) => o.checked);
                            if (checkedItem && checkedItem.value != this.data.ordStatus) {
                                changed = true;
                                this.setData({ ordStatus: checkedItem.value });
                            }
                        } else if (n.value === 'creationTime') {
                            const sortType = n.sort === 1 ? "1" : "2";
                            if (sortType != this.data.sortType) {
                                changed = true;
                                this.setData({ sortType });
                            }
                        } else if (n.value === 'filter') {
                            const ordStatusFilter = n.children.find((o) => o.value === "orderStatus");
                            const checkedOrdStatus = ordStatusFilter.children.find((o) => o.checked);
                            if (checkedOrdStatus && checkedOrdStatus.value != this.data.ordStatus) {
                                changed = true;
                                this.setData({ ordStatus: checkedOrdStatus.value });
                            }
                            const creationTimeFilter = n.children.find((o) => o.value === "creationTime");
                            const checkedCreationTime = creationTimeFilter.children.find((o) => o.checked);
                            if (checkedCreationTime && checkedCreationTime.value != this.data.sortType) {
                                changed = true;
                                this.setData({ sortType: checkedCreationTime.value });
                            }
                        }
                    }
                });
                if (changed) {
                    this.initData();
                    this.refreshFilterBar(items);
                }
                this.filterBar.onCloseSelect();
            }
        });
        this.refresher = new $wuxRefresher({
            onPulling() {
                console.log('onPulling');
            },
            onRefresh() {
                console.log('onRefresh');
                this.scope.initData().then(() => {
                    this.events.emit(`scroll.refreshComplete`);
                });
            }
        });
        app.basicInfoPromise.then(() => {
            if (AS.isDriver()) {
                this.data.items[0].children.shift();
                this.data.items[2].children[0].children.shift();
            }
        });
    },
    onShow() {
        this.initData();
    },
    touchstart(e) {
        this.refresher.touchstart(e);
    },
    touchmove(e) {
        this.refresher.touchmove(e);
    },
    touchend(e) {
        this.refresher.touchend(e);
    },
    getModelNameById(modelId) {
        if (!app.globalData.models || app.globalData.models.length == 0) {
            return "";
        }
        const foundItem = app.globalData.models.find(m => m.id.toString() == modelId.toString());
        return foundItem ? foundItem.modelName : "";
    },
    tapToPreview(e) {
        const currentIndex = parseInt(e.target.id);
        const tableData = this.data.tableData;
        for (let i = 0; i < tableData.length; i++) {
            if (i != currentIndex) {
                tableData[i].previewing = false;
                continue;
            }
            tableData[i].previewing = !(tableData[i].previewing);
        }
        this.setData({ tableData });
        const currentOrder = tableData[currentIndex];
        if (currentOrder.previewing) {
            const products = currentOrder.products;
            if (products.length > 0) {
                const { ordAddress, ordStatus } = currentOrder;
                const { proModel, proNum } = products[0];
                const previewItems = [
                    { label: "型号", value: this.getModelNameById(proModel) },
                    { label: "数量", value: proNum },
                    { label: "配送至", value: ordAddress },
                    { label: "到货时间", value: currentOrder.endOrderTime },
                    { label: "订单状态", value: Models.OrderStatus[ordStatus] }
                ];
                this.setData({ previewItems });
            }
        }
    },
    tapToEditOrder(e) {
        const currentIndex = parseInt(e.target.id);
        const order = this.data.tableData[currentIndex];
        wx.navigateTo({
            url: Util.formatUnicorn('../editOrder/editOrder?orderInfo={0}', JSON.stringify(order))
        });
    },
    handlePagerChange(e) {
        const pagerData = e.detail;
        this.setData({ pageIndex: pagerData.pageIndex });
        this.initData();
    }
});