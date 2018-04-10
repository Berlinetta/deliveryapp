import { $wuxFilterBar, $wuxRefresher } from '../../packages/wux/wux.js'

class TablePage {
  constructor() {
    this.options = {
      showFilterBar: false,
      showRefresher: false,
      showPager: false,
    };
    this.data = {
      items: [],
      tableData: []
    };
  }

  _setOptions(newOptions) {
    this.options = Object.assign({}, this.options, newOptions);
  }

  _initFilterBar() {
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
  }

  _initRefresher() {
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
  }

  onLoad() {
    if (this.options.showFilterBar) {
      this._initFilterBar();
    }
    if (this.options.showRefresher) {
      this._initRefresher();
    }
  }
  touchstart(e) {
    if (this.options.showRefresher) {
      this.refresher.touchstart(e);
    }
  }
  touchmove(e) {
    if (this.options.showRefresher) {
      this.refresher.touchmove(e);
    }
  }
  touchend(e) {
    if (this.options.showRefresher) {
      this.refresher.touchend(e);
    }
  }
}

export default TablePage;