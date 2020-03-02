const app = getApp();
// pages/myCollect/myCollect.js
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
    // 请求数据
    getList: function(isConcat, page) {
        const _this = this;
        const Concat = isConcat || false;
        const newPage = page || 1
        wx.request({
            url: `https://www.yxxcloud.cn/api/selectUserCollection?currentPage=${newPage}`,
            data: {
                openID: wx.getStorageSync('userID'),
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (result) => {
                const collectionList = result.data.collectionList;
                if (!collectionList) {
                    _this.data.request = false;
                    return false
                };
                let newlist = '';
                if (Concat) {
                    newlist = _this.data.goodsList.concat(collectionList)
                } else {
                    newlist = collectionList
                }
                //停止加载动画
                wx.hideToast();
                _this.setData({
                    goodsList: newlist,
                    requesting: false
                })
                if (collectionList.length === 10) {
                    _this.setData({
                        allPage: _this.data.allPage += 1
                    })
                }

            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 取消收藏
    cancelCollect: function(option) {
        const { goodsId, index } = option.currentTarget.dataset;
        const _this = this;
        wx.request({
            url: 'https://www.yxxcloud.cn/api/cancelCollection',
            data: {
                goodsID: goodsId,
                openID: wx.getStorageSync('userID')
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                if (!result.data.status) {
                    return wx.showToast({
                        title: '出错啦！',
                        icon: 'none',
                        duration: 800
                    })
                }
                //加载动画
                wx.showToast({
                        title: '取消收藏成功！',
                        icon: 'success',
                        duration: 800
                    })
                    // 删除这个数据
                _this.data.goodsList.splice(index, 1)
                _this.setData({
                    goodsList: _this.data.goodsList
                })

            },
            fail: () => {
                wx.showToast({
                    title: '出错啦！',
                    icon: 'none',
                    duration: 800
                })
            },
            complete: () => {}
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getList()
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