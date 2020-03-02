// pages/compontent.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBar: [],
        goodsList: [],
        nowPage: 1,
        allPage: 1,
        atLast: false,
        requesting: false,
        isAuthorization: false,
        url: app.globalData.url
    },
    // 获得最新商品列表
    getNewGoods: function(concat, e) {
        const isConcat = concat
        const _this = this;
        const page = e || 1;
        wx.request({
            url: `https://www.yxxcloud.cn/api/selectGoodsByGoodsDescribe?currentPage=${page}`,
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                //停止下拉动画
                wx.stopPullDownRefresh();
                //停止加载动画
                wx.hideToast();
                let goodsList;
                if (isConcat) {
                    goodsList = _this.data.goodsList.concat(result.data.goodslist)
                } else {
                    goodsList = result.data.goodslist
                }
                _this.setData({
                    goodsList: goodsList,
                    allPage: result.data.maxpage,
                    requesting: false
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 获得种类列表
    getTypeList: function() {
        const _this = this;
        wx.request({
            url: 'https://www.yxxcloud.cn/api/getAllCategory',
            success: (res) => {
                _this.setData({
                    navBar: res.data.categoryList
                })
                app.globalData.navList = res.data.categoryList
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getTypeList();
        this.getNewGoods(false, 1);
        if (!wx.getStorageSync('Authorization')) {
            const _this = this;
            app.Authorization().then((res) => {
                _this.setData({
                    isAuthorization: res.isAuthorization
                })
            }).catch((err) => {
                _this.setData({
                    isAuthorization: err.isAuthorization
                })
            });
        }
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
        this.getNewGoods(false, 1);
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
    onPullDownRefresh: function() {
        this.getNewGoods(false, 1);
    },
    // 授权界面
    onGotUserInfo: function(e) {
        if (e.detail.userInfo) {
            app.Authorization();
            this.setData({
                isAuthorization: false
            })
        }
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        const _this = this;
        if (!_this.data.requesting) {
            if (_this.data.atLast) return;
            if (_this.data.nowPage === _this.data.allPage) {
                _this.setData({
                    atLast: true
                })
                return
            };
            _this.setData({
                nowPage: _this.data.nowPage += 1,
                requesting: true
            });
            wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 10000
                })
                //发送请求
            _this.getNewGoods(true, _this.data.nowPage);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})