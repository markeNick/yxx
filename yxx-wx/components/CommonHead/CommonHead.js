// components/CommonHead/CommonHead.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        addGlobalClass: true
    },
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        searchInfo: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        updateSearch: function(e) {
            this.setData({
                searchInfo: e.detail.value
            })
        },
        searchThing: function() {
            const _this = this;
            //判断当前路径
            let pages = getCurrentPages();
            let currPage = null;
            if (pages.length) {
                currPage = pages[pages.length - 1];
            };
            if (currPage.route === "pages/index/index") {
                wx.navigateTo({
                    url: `/pages/goodsList/goodsList?search=${_this.data.searchInfo}`,
                })
                return
            };
            wx.request({
                url: `https://www.yxxcloud.cn/api/selectGoodsByGoodsDescribe?goodsDescribe=${_this.data.searchInfo}`,
                header: { 'content-type': 'application/json' },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                    //组件传值
                    _this.triggerEvent('whatSearch', _this.data.searchInfo)
                    _this.triggerEvent('search', result.data);
                },
                fail: () => {},
                complete: () => {}
            });
        }
    }
})