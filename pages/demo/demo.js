import TablePage from '../../components/tTable/tTable.js'

class DemoPage extends TablePage {
  constructor() {
    super();
    this._setOptions({
      showFilterBar: true,
      showRefresher: true
    });
    this.data = {
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
        }
      ],
      tableData: [
        { title: "sdsdfs", subtitle: "subtitle1" }
      ]
    };
  }
}

const finalConfig = new DemoPage();

Page(finalConfig);