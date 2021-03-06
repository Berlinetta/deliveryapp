import {$wuxFilterBar, $wuxRefresher} from '../../packages/wux/wux.js'

Component({
    properties: {},
    data: {
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
                        label: '配送中',
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
            }
        ],
        tableData: [
            {title: "sdsdfs", subtitle: "subtitle1"}
        ]
    },
    ready: function () {
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
                //this.getRepos(params);
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
                        tableData: tableData
                    });

                    this.events.emit(`scroll.refreshComplete`);
                }, 2000);
            }
        });
    },
    methods: {
        touchstart(e) {
            this.refresher.touchstart(e);
        },
        touchmove(e) {
            this.refresher.touchmove(e);
        },
        touchend(e) {
            this.refresher.touchend(e);
        }
    }
});
