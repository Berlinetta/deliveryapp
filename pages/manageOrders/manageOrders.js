import { $wuxFilterBar, $wuxRefresher } from '../../packages/wux/wux.js'
import ApiSdk from "../../sdk/ApiSdk";
import Models from "../../services/models/Models.js";
import Util from "../../utils/util.js";
import AuthorizationService from '../../services/AuthorizationService.js';

Page({
	data: {
		canEditOrder: false,
		previewItems: [
			{ label: "型号", value: "型号1" },
			{ label: "数量", value: "133件" },
			{ label: "配送至", value: "北京市城建工地111" },
			{ label: "到货时间", value: "2018-4-18" },
			{ label: "订单状态", value: "未调度" }
		],
		items: [
			{
				type: 'radio',
				label: '状态',
				value: 'orderStatus',
				children: [{
					label: '未调度',
					value: 'new',
					checked: true
				},
				{
					label: '调度中',
					value: 'dispatching'
				},
				{
					label: '已完成',
					value: 'completed'
				},
				{
					label: '未完成',
					value: 'unfinished'
				}
				],
				groups: ["1"]
			},
			{
				type: 'radio',
				label: '范围',
				value: 'orderStatus',
				children: [{
					label: '我的订单',
					value: 'myOrders',
					checked: true
				},
				{
					label: '全部订单',
					value: 'allOrders'
				}
				],
				groups: ["2"]
			},
			{
				type: 'sort',
				label: '创建时间',
				value: 'time',
				sort: -1,
				groups: ["3"]
			},
			{
				type: 'filter',
				label: '筛选',
				value: 'filter',
				children: [{
					type: 'radio',
					label: '状态',
					value: 'status',
					children: [{
						label: '未调度',
						value: 'new'
					},
					{
						label: '调度中',
						value: 'dispatching'
					},
					{
						label: '已完成',
						value: 'completed'
					},
					{
						label: '未完成',
						value: 'unfinished'
					}
					],
				},
				{
					type: 'radio',
					label: '范围',
					value: 'range',
					children: [{
						label: '我的订单',
						value: 'myOrders'
					},
					{
						label: '全部订单',
						value: 'allOrders'
					}
					]
				},
				{
					type: 'radio',
					label: '创建时间',
					value: 'range',
					children: [{
						label: '升序',
						value: 'asc'
					},
					{
						label: '降序',
						value: 'desc'
					}
					]
				}
				],
				groups: ['001', '002', '003']
			}
		],
		tableData: [
		]
	},
	onLoad() {
		this.$wuxFilterBar = $wuxFilterBar.init({
			items: this.data.items,
			onChange: (checkedItems, items) => {
				const params = {};

				/* checkedItems.forEach((n) => {
				  if (n.checked) {
					if (n.value === 'updated') {
					  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
					  params.sort = n.value
					  params.order = selected
					} else if (n.value === 'stars') {
					  params.sort = n.value
					  params.order = n.sort === 1 ? 'asc' : 'desc'
					} else if (n.value === 'forks') {
					  params.sort = n.value
					} else if (n.value === 'filter') {
					  n.children.filter((n) => n.selected).forEach((n) => {
						if (n.value === 'language') {
						  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
						  params.language = selected
						} else if (n.value === 'query') {
						  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
						  params.query = selected
						}
					  })
					}
				  }
				}); */

				this.$wuxFilterBar.onCloseSelect();
			}
		});
		this.refresher = new $wuxRefresher({
			onPulling() {
				console.log('onPulling');
			},
			onRefresh() {
				console.log('onRefresh');
				setTimeout(() => {
					const tableData = this.scope.data.tableData;

					tableData.unshift({
						title: "ddd",
						subtitle: '由各种物质组成。'
					});

					this.scope.setData({
						tableData
					});

					this.events.emit(`scroll.refreshComplete`);
				}, 2000);
			}
		});
	},
	onShow() {
		ApiSdk.OrdersService.getPagedOrders(1, 10, 1).then(orders => {
			orders.forEach((orderPromise, index) => {
				orderPromise.then((o) => {
					let productName = "";
					if (o.products && o.products.length > 0) {
						productName = o.products[0].productName;
					}
					const od = Object.assign({}, o, {
						title: productName,
						subtitle: "",
						previewing: false
					});
					const tableData = this.data.tableData;
					tableData[index] = od;
					this.setData({ tableData });
				});
			});
		});
		setTimeout(() => {
			const AS = new AuthorizationService();
			this.setData({ canEditOrder: (AS.isAdmin() || AS.isDispatcher()) });
		}, 2000);
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
					{ label: "型号", value: proModel },
					{ label: "数量", value: proNum },
					{ label: "配送至", value: ordAddress },
					{ label: "到货时间", value: "" },
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
		})
	}
});