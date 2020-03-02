const app = getApp();
// pages/otherIssue/otherIssue.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        otherUid: '',
        user: {},
        url: app.globalData.url,
        nowPage: 1,
        allPage: 1,
        goodsList: [],
        atLast: false,
        requesting: false
    },
    // 请求数据
    getList: function(uid, isConcat, page) {
        const _this = this;
        const Concat = isConcat || false;
        const newPage = page || 1
        wx.request({
            url: `https://www.yxxcloud.cn/api/selectAllMyPublishGoods?currentPage=${newPage}`,
            data: {
                openID: uid,
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (result) => {
                const mypublishlist = result.data.mypublishlist;
                let newlist = '';
                if (Concat) {
                    newlist = _this.data.goodsList.concat(mypublishlist)
                } else {
                    newlist = mypublishlist
                }
                _this.setData({
                    goodsList: newlist,
                    requesting: false
                })
                if (mypublishlist.length === 10) {
                    _this.setData({
                        allPage: _this.data.allPage += 1
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
        const uid = options.uid;
        const _this = this;
        this.setData({
            otherUid: uid
        })
        this.getList(uid, false);
        wx.request({
            url: 'https://www.yxxcloud.cn/api/selectUserByopenID',
            data: {
                openID: uid
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                _this.setData({
                    user: result.data.user
                })
                wx.setNavigationBarTitle({
                    title: `${result.data.user.userName}的发布`
                })
            },
            fail: () => {},
            complete: () => {}
        });
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
            //发送请求
            _this.getList(this.data.otherUid, true, _this.data.nowPage);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})