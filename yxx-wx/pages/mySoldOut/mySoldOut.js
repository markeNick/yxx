const app = getApp();
// pages/mySoldOut.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: app.globalData.url,
        nowPage: 1,
        allPage: 1,
        goodsList: [],
        atLast: false,
        requesting: false
    },
    // 请求列表
    getList: function(isConcat, page) {
        const _this = this;
        const Concat = isConcat || false;
        const newPage = page || 1
        wx.request({
            url: `https://www.yxxcloud.cn/api/OffShelvesGoods?currentPage=${newPage}`,
            data: {
                openID: wx.getStorageSync('userID'),
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (result) => {
                const offGoodsList = result.data.offGoodsList;
                if (!offGoodsList) {
                    _this.data.request = false;
                    return false
                };
                let newlist = '';
                if (Concat) {
                    newlist = _this.data.goodsList.concat(offGoodsList)
                } else {
                    newlist = offGoodsList
                }
                //停止加载动画
                wx.hideToast();
                _this.setData({
                    goodsList: newlist,
                    requesting: false
                })
                if (offGoodsList.length === 10) {
                    _this.setData({
                        allPage: _this.data.allPage += 1
                    })
                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 上架商品
    putAway: function(options) {
        const _this = this;
        const goodsID = options.currentTarget.dataset.sid;
        const index = options.currentTarget.dataset.index;
        wx.request({
            url: `https://www.yxxcloud.cn/api/pullOnShelves`,
            data: {
                openID: wx.getStorageSync('userID'),
                goodsID
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (result) => {
                if (!result.data.status) {
                    return wx.showToast({
                        title: '出错啦！',
                        icon: 'none',
                        duration: 800
                    })
                }
                _this.data.goodsList.splice(index, 1)
                _this.setData({
                    goodsList: _this.data.goodsList
                })
                return wx.showToast({
                    title: '上架成功！',
                    icon: 'none',
                    duration: 800
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 删除商品
    delete: function(options) {
        const _this = this;
        const goodsID = options.currentTarget.dataset.sid;
        const index = options.currentTarget.dataset.index;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function(sm) {
                if (sm.confirm) {
                    wx.request({
                        url: `https://www.yxxcloud.cn/api/deleteGoods`,
                        data: {
                            openID: wx.getStorageSync('userID'),
                            goodsID
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: (result) => {
                            if (!result.data.status) {
                                return wx.showToast({
                                    title: '出错啦！',
                                    icon: 'none',
                                    duration: 800
                                })
                            }
                            _this.data.goodsList.splice(index, 1)
                            _this.setData({
                                goodsList: _this.data.goodsList
                            })
                            return wx.showToast({
                                title: '删除成功！',
                                icon: 'none',
                                duration: 800
                            })
                        },
                        fail: () => {},
                        complete: () => {}
                    });
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getList(false)
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
    onPullDownRefresh: function() {

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
            //加载动画
            wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 10000
                })
                //发送请求
            _this.getList(true, _this.data.nowPage);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})