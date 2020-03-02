const app = getApp();
// pages/goodsList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: app.globalData.url,
        currentIndex: -1,
        // 接收到的搜索内容 搜索结果 页面长度
        whatSearch: "",
        goodsList: [],
        allPage: 1,
        //种类列表
        navBar: [],
        // 当前页数 是否到底 是否在请求中
        nowPage: 1,
        atLast: false,
        requesting: false
    },
    // 子组件传值 获得搜索内容
    getWhatSearch: function(e) {
        this.setData({
            whatSearch: e.detail,
            currentIndex: -1
        })
    },
    // 子组件传值 获得搜索结果 页码
    getSearch: function(e) {
        this.setData({
            goodsList: e.detail.goodslist,
            allPage: e.detail.maxpage || 1
        })
    },
    // 选择种类并且搜索改种类的商品
    checkNav: function(options) {
        const _this = this;
        this.setData({
                currentIndex: options.currentTarget.dataset.index
            })
            //发送请求
        wx.request({
            url: `https://www.yxxcloud.cn/api/selectGoodsByGoodsDescribe?categoryId=${_this.data.currentIndex}`,
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                //停止加载动画
                wx.hideToast();
                _this.setData({
                    goodsList: result.data.goodslist,
                    allPage: result.data.maxpage || 1,
                    // 清空搜索内容
                    whatSearch: "",
                    atLast: false,
                    requesting: false,
                })

                if (!result.data.goodslist) {
                    _this.setData({
                        goodsList: [],
                    })
                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    //获得商品列表
    getGoodsList: function(search, page) {
        const _this = this;
        const nowPage = page || 1;
        //发送请求
        wx.request({
            url: `https://www.yxxcloud.cn/api/selectGoodsByGoodsDescribe?${search}&currentPage=${nowPage}`,
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                //停止下拉动画
                wx.stopPullDownRefresh();
                //停止加载动画
                wx.hideToast();
                const newlist = _this.data.goodsList.concat(result.data.goodslist);
                _this.setData({
                    atLast: false,
                    requesting: false,
                    goodsList: newlist,
                    allPage: result.data.maxpage || 1
                })
                if (!result.data.goodslist) {
                    _this.setData({
                        atLast: true,
                        goodsList: [],
                    })
                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //更新种类列表
        this.setData({
            navBar: app.globalData.navList
        })
        const _this = this;
        //设置搜索默认为空值
        let search = 'goodsDescribe=';

        if (options.type) {
            search = `categoryId=${options.type}`
            this.setData({
                currentIndex: options.type
            })
        } else {
            search = `goodsDescribe=${options.search}`
            this.setData({
                currentIndex: -1,
                whatSearch: options.search
            })
        }
        //发送请求
        _this.getGoodsList(search)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        const _this = this;
        let search = 'goodsDescribe=';
        // 检查是否到最后一页了
        if (_this.data.atLast) { return }
        // 检查当前是否在进行请求
        if (_this.data.requesting) { return }
        //检查当前页码和最长页码是否相等
        if (_this.data.nowPage == _this.data.allPage) {
            _this.setData({
                atLast: true
            })
            return
        };
        // 通过判断currentIndex的值是否为-1从而判断是种类搜索还是内容搜索
        if (_this.data.currentIndex != -1) {
            // 种类搜索
            search = `categoryId=${_this.data.currentIndex}`
        } else {
            search = `goodsDescribe=${_this.data.whatSearch}`
        }
        // 当前页码自增1
        _this.setData({
            nowPage: _this.data.nowPage += 1,
            requesting: true
        });
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        _this.getGoodsList(search, _this.data.nowPage)

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})