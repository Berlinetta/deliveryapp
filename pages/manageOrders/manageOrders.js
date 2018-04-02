import { $wuxFilterBar } from '../../packages/wux/wux.js'

Page({
  data: {
    items: [
      {
        type: 'radio',
        label: '配送状态',
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
        label: '时间排序',
        value: 'time',
        sort: -1,
        groups: ["3"]
      }
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
        //this.getRepos(params);
      },
    });
  }
})