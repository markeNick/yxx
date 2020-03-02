// pages/goodsDetail/goodsDetail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: app.globalData.url,
        goodsId: -1,
        goodsName: '',
        goodsDescribe: '',
        goodsPrice: 0,
        goodsImage: [],
        createTime: '',
        userName: '',
        userImage: '',
        userID: null,
        // 卖家是不是自己
        isSelf: false,
        // 是否收藏
        isCollect: false,
        // 是否售出
        isSale: false,
        reply: [],
        replyStatus: [],
        firstMessage: [],
        // 回复窗口显隐 回复内容
        replyView: false,
        replyInfo: '',
        // 回复者ID Name 回复框编号 回复框编号序列 是否回复某个用户
        listenerOpenID: '',
        listener: '',
        messageNumber: '',
        replyIndex: -1,
        isReplyOne: false,
        // 上拉加载更多的数据
        nowPage: 1,
        allPage: 1,
        atLast: false,
        requesting: false
    },
    // 打开留言界面
    openReply: function(options) {
        const data = options.currentTarget.dataset
        this.setData({
            replyView: true,
        })
        if (data.replyOne === "true") {
            this.setData({
                listenerOpenID: data.listenerUid,
                listener: data.listener,
                messageNumber: data.messageNumber,
                replyIndex: data.replyIndex,
                isReplyOne: true
            })
        }
    },
    // 关闭留言界面
    closeReply: function() {
        this.setData({
            replyView: false,
            listenerOpenID: '',
            listener: '',
            messageNumber: '',
            replyIndex: -1,
            replyInfo: '',
            isReplyOne: false
        })
    },
    // 发表留言
    postMessage: function() {
        const _this = this;
        if (this.data.isReplyOne) {
            wx.request({
                url: 'https://www.yxxcloud.cn/api/doMessage',
                data: {
                    speaker: wx.getStorageSync('nickName'),
                    speakerImage: wx.getStorageSync('avatarUrl'),
                    speakerOpenID: wx.getStorageSync('userID'),
                    listener: _this.data.listener,
                    listenerOpenID: _this.data.listenerOpenID,
                    messageNumber: _this.data.messageNumber,
                    goodsId: _this.data.goodsId,
                    message: _this.data.replyInfo
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
                        title: '回复成功！',
                        icon: 'success',
                        duration: 800
                    })
                    _this.getMessageNumInfo(true, _this.data.messageNumber, _this.data.replyIndex)
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
        } else {
            wx.request({
                url: 'https://www.yxxcloud.cn/api/doMessage',
                data: {
                    speaker: wx.getStorageSync('nickName'),
                    speakerImage: wx.getStorageSync('avatarUrl'),
                    speakerOpenID: wx.getStorageSync('userID'),
                    goodsId: _this.data.goodsId,
                    message: _this.data.replyInfo
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
                        title: '回复成功！',
                        icon: 'success',
                        duration: 800
                    })
                    _this.setData({
                        reply: [],
                        firstMessage: [],
                    })
                    _this.getGoodsInfo(_this.data.goodsId)
                    _this.closeReply()
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
        }
    },
    // 修改留言内容
    changeMessage: function(e) {
        this.setData({
            replyInfo: e.detail.value
        })
    },
    // 获得单个留言框的全部内容
    getMessageNumInfo: function(flag, num, index, options) {
        const _this = this;
        let messageNumber, replyIndex, nowPage;
        if (flag === true) {
            // 如果是回复后的自动获取
            messageNumber = num;
            replyIndex = index;
            nowPage = 1;
        } else {
            const data = flag.currentTarget.dataset;
            messageNumber = data.messageNumber
            replyIndex = data.index;
            nowPage = _this.data.replyStatus[data.index].nowPage += 1
        }
        if (nowPage > _this.data.replyStatus[replyIndex].allPage) {
            return false
        }
        wx.request({
            url: 'https://www.yxxcloud.cn/api/selectDetailForReply',
            data: {
                messageNumber: messageNumber,
                currentPage: nowPage
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                let replylist = result.data.replylist;
                if (nowPage === 1) {
                    replylist.splice(0, 1)
                }
                for (let i = 0; i < replylist.length; i++) {
                    replylist[i].createTime = app.transformTime(replylist[i].createTime)
                }
                if (nowPage > 1) {
                    replylist = _this.data.reply[replyIndex].concat(replylist)
                }
                // 如果获取的数据总数等于15
                if (replylist.length === 15) {
                    _this.data.replyStatus[replyIndex].allPage = _this.data.reply[replyIndex].allPage += 1;
                    _this.data.replyStatus[replyIndex].isShow = true
                } else {
                    _this.data.replyStatus[replyIndex].allPage = 1;
                    _this.data.replyStatus[replyIndex].isShow = false
                }
                _this.data.replyStatus[replyIndex].nowPage = nowPage;
                const index = `reply[${replyIndex}]`;
                _this.setData({
                    [index]: replylist,
                    replyStatus: _this.data.replyStatus
                })
                _this.closeReply()
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 收藏
    collect: function(sid) {
        const goodsId = sid;
        const _this = this;
        wx.request({
            url: 'https://www.yxxcloud.cn/api/collectGoods',
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
                    title: '收藏成功！',
                    icon: 'success',
                    duration: 800
                })
                _this.setData({
                    isCollect: true
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
    // 取消收藏
    cancelCollect: function(sid) {
        const goodsId = sid;
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
                _this.setData({
                    isCollect: false
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
    // 切换收藏状态
    toggleCollect: function(options) {
        const goodsId = options.currentTarget.dataset.sid;
        if (this.data.isCollect) {
            this.cancelCollect(goodsId)
        } else {
            this.collect(goodsId)
        }
    },
    // 请求商品信息
    getGoodsInfo: function(sid, page) {
        const _this = this;
        const goodsId = sid;
        const newPage = page || 1;
        const uid = wx.getStorageSync('userID');
        // 请求商品信息
        wx.request({
            url: 'https://www.yxxcloud.cn/api/selectOneGoodsDetailMessage',
            data: {
                openID: uid,
                goodsId,
                currentPage: newPage
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: (result) => {
                const message = result.data.goodsmessage;
                let replylist = result.data.replylist;
                if (message.openID == uid) {
                    _this.setData({
                        isSelf: true
                    })
                }
                if (message.status == 1) {
                    _this.setData({
                        isSale: true
                    })
                }
                for (let i = 0; i < replylist.length; i++) {
                    for (let h = 0; h < replylist[i].length; h++) {
                        replylist[i][h].createTime = app.transformTime(replylist[i][h].createTime)
                    }
                    const headReply = replylist[i].splice(0, 1)
                        // 给每一个留言框设置当前页码 总页码
                    _this.data.replyStatus[i + (newPage - 1) * 6] = {
                        nowPage: 0,
                        allPage: 1
                    }
                    if (replylist[i].length === 2) {
                        _this.data.replyStatus[i + (newPage - 1) * 6].isShow = true;
                    } else {
                        _this.data.replyStatus[i + (newPage - 1) * 6].isShow = false;
                    }
                    _this.data.firstMessage.push(headReply)
                }
                wx.hideToast();
                if (replylist.length === 6) {
                    _this.setData({
                        allPage: _this.data.allPage += 1
                    })
                }
                replylist = _this.data.reply.concat(replylist)
                _this.setData({
                    goodsId: message.goodsId,
                    goodsName: message.goodsName,
                    goodsDescribe: message.goodsDescribe,
                    goodsPrice: message.goodsPrice,
                    goodsImage: message.goodsImage,
                    createTime: app.transformTime(message.createTime),
                    userName: message.userName,
                    userImage: message.userImage,
                    userID: message.openID,
                    isCollect: result.data.collected,
                    reply: replylist,
                    replyStatus: _this.data.replyStatus,
                    firstMessage: _this.data.firstMessage,
                    requesting: false
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 创造对话
    createChat: function() {
        const _this = this
        wx.request({
            url: 'https://www.yxxcloud.cn/api/iWant',
            data: {
                A_openID: wx.getStorageSync('userID'),
                B_openID: _this.data.userID,
                goodsID: _this.data.goodsId
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                if (result.data.status) {
                    wx.navigateTo({
                        url: `/pages/chatInterface/chatInterface?me=${wx.getStorageSync('userID')}&other=${_this.data.userID}&otherName=${_this.data.userName}&otherImage=${_this.data.userImage}&status=0&seller=${_this.data.userID}&goodId=${_this.data.goodsId}&price=${_this.data.goodsPrice}&goodPic=${_this.data.goodsImage[0]}`,
                    });
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

        const sid = options.sid
        const uid = wx.getStorageSync('userID');
        this.getGoodsInfo(sid)
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
            if (_this.data.atLast) {
                return wx.showToast({
                    title: '到底啦！',
                    icon: 'none',
                    duration: 800
                })
            };
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
            _this.getGoodsInfo(_this.data.goodsId, _this.data.nowPage);
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})