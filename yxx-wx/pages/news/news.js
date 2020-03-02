const app = getApp();
let updataNewInterval = null
    // pages/news/news.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: app.globalData.url,
        type: 0,
        chatList: [],
        messageList: [],
        // 回复者ID Name 回复框编号 商品ID 回复窗口显隐 回复内容
        listenerOpenID: '',
        listener: '',
        messageNumber: '',
        goodsId: '',
        replyInfo: '',
        replyView: false,
        // 上拉加载更多的数据
        nowPage: 1,
        allPage: 1,
        atLast: false,
        requesting: false,
        //长按计时器
        touchStart: 0,
        touchEnd: 0
    },

    // 点击切换类型
    switchType: function(e) {
        if (e.currentTarget.dataset.type === "false") {
            this.setData({
                type: 0,
                // 上拉加载更多的数据
                nowPage: 1,
                allPage: 1,
                atLast: false,
                requesting: false,
                messageList: [],
                replyView: false,
                listenerOpenID: '',
                listener: '',
                messageNumber: '',
                replyInfo: '',
                goodsId: ''
            })
            this.getChatList()
        } else {
            this.setData({
                type: 1,
                // 上拉加载更多的数据
                nowPage: 1,
                allPage: 1,
                atLast: false,
                requesting: false,
                chatList: []
            })
            this.getMessageList()
        }
    },

    //获取聊天列表
    getChatList: function(isConcat, page) {
        const Concat = isConcat || false;
        const currentPage = page || 1;
        const _this = this;
        wx.request({
            url: 'https://www.yxxcloud.cn/api/getChatList',
            data: {
                openID: wx.getStorageSync('userID'),
                currentPage
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                wx.hideToast();
                const chatList = result.data.chatList;
                let newlist = '';
                for (let i = 0; i < chatList.length; i++) {
                    const bopenIDAndGoodsID = chatList[i].bopenID + chatList[i].goodsID;
                    chatList[i].modifyTime = app.transformTime(chatList[i].modifyTime)
                        // 检索是否该对话在未读列表中是否存在，如果存在
                        //  则添加最后一句话到chatList中，不存在，则查看本地是否存在该值对应的聊天记录，
                        // 如果存在就录入，然后添加最后一句话到chatList中，不存在就设置为空
                    const haveNo = app.globalData.readKey.findIndex(value => {
                        return bopenIDAndGoodsID == value
                    })
                    chatList[i].last = '没有进行聊天'
                    chatList[i].lastTime = chatList[i].modifyTime
                    chatList[i].unreadNum = 0
                    if (haveNo < 0) {
                        if (wx.getStorageSync(bopenIDAndGoodsID)) {
                            const list = wx.getStorageSync(bopenIDAndGoodsID)
                            app.globalData.readValue[bopenIDAndGoodsID] = list
                            if (list.length > 0) {
                                chatList[i].last = app.globalData.readValue[bopenIDAndGoodsID].slice(-1)[0].content
                                chatList[i].lastType = app.globalData.readValue[bopenIDAndGoodsID].slice(-1)[0].isPic
                                chatList[i].lastTime = app.transformTime(app.globalData.readValue[bopenIDAndGoodsID].slice(-1)[0].theTime)
                            }
                        } else {
                            wx.setStorageSync(bopenIDAndGoodsID, [])
                            app.globalData.readValue[bopenIDAndGoodsID] = []
                        }
                    } else {
                        try {
                            chatList[i].last = app.globalData.readValue[bopenIDAndGoodsID].slice(-1)[0].content
                            chatList[i].lastType = app.globalData.readValue[bopenIDAndGoodsID].slice(-1)[0].isPic
                            chatList[i].lastTime = app.transformTime(app.globalData.readValue[bopenIDAndGoodsID].slice(-1)[0].theTime)
                            chatList[i].unreadNum = wx.getStorageSync(`UNREAD${bopenIDAndGoodsID}`).length
                        } catch (error) {

                        }
                    }
                }
                if (Concat) {
                    newlist = _this.data.chatList.concat(chatList)
                } else {
                    newlist = chatList
                }
                if (chatList.length === 10) {
                    _this.setData({
                        allPage: _this.data.allPage += 1
                    })
                }
                this.setData({
                    requesting: false,
                    chatList: newlist
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 查看是否有人发送信息，并且更新数据
    updataNew: function() {
        if (!app.globalData.transfer) return;
        for (let i = 0; i < this.data.chatList.length; i++) {
            const listOpenID = this.data.chatList[i]
            const bopenIDAndGoodsID = listOpenID.bopenID + listOpenID.goodsID;
            if (app.globalData.readValue[bopenIDAndGoodsID].length === 0) continue;
            listOpenID.last = app.globalData.readValue[bopenIDAndGoodsID].slice(-1)[0].content;
            listOpenID.lastType = app.globalData.readValue[bopenIDAndGoodsID].slice(-1)[0].isPic;
            listOpenID.lastTime = app.transformTime(app.globalData.readValue[bopenIDAndGoodsID].slice(-1)[0].theTime);
            listOpenID.unreadNum = wx.getStorageSync(`UNREAD${bopenIDAndGoodsID}`).length
        }
        this.setData({
            chatList: this.data.chatList
        })
        app.globalData.transfer = false
    },
    // 开始事件
    touchStart: function(e) {
        this.setData({
            touchStart: e.timeStamp
        })
    },
    // 结束事件
    touchEnd: function(e) {
        this.setData({
            touchEnd: e.timeStamp
        })
    },
    // 删除聊天
    navToAndDelete: function(options) {
        const _this = this
        const datas = options.currentTarget.dataset
        const timeInterval = this.data.touchEnd - this.data.touchStart
        if (timeInterval > 1000) {
            wx.showModal({
                title: '提示',
                content: '是否删除该聊天？(删除后聊天记录会全部销毁)',
                success: function(res) {
                    if (res.confirm) {
                        wx.request({
                            url: 'https://www.yxxcloud.cn/api/deleteChatList',
                            data: {
                                A_openID: datas.me,
                                B_openID: datas.other,
                                goodsID: datas.goodsId
                            },
                            header: { 'content-type': 'application/x-www-form-urlencoded' },
                            method: 'POST',
                            dataType: 'json',
                            responseType: 'text',
                            success: (result) => {
                                if (result.data.status) {
                                    wx.showToast({
                                        title: '删除成功！',
                                        icon: 'success',
                                        duration: 500,
                                        mask: false,
                                    });
                                    _this.data.chatList.splice(datas.index, 1)
                                    _this.setData({
                                        chatList: _this.data.chatList
                                    })
                                    app.globalData.readValue[datas.other + datas.goodsId] = []
                                    wx.removeStorageSync(datas.other + datas.goodsId);
                                }
                            },
                            fail: () => {},
                            complete: () => {}
                        });
                    } else if (res.cancel) {
                        return
                    }
                }
            })
        } else {
            wx.navigateTo({
                url: `/pages/chatInterface/chatInterface?me=${datas.me}&other=${datas.other}&otherName=${datas.otherName}&otherImage=${datas.otherImage}&status=${datas.goodsStatus}&seller=${datas.seller}&goodId=${datas.goodsId}&price=${datas.price}&goodPic=${datas.goodsImg}`,
            });
        }
        this.setData({
            touchStart: 0,
            touchEnd: 0
        })
    },
    //页面跳转
    // 打开留言界面
    openReply: function(options) {
        const data = options.currentTarget.dataset
        this.setData({
            replyView: true,
            goodsId: data.goodsId,
            listener: data.listener,
            listenerOpenID: data.listenerUid,
            messageNumber: data.messageNum
        })
    },
    // 关闭留言界面
    closeReply: function() {
        this.setData({
            replyView: false,
            listenerOpenID: '',
            listener: '',
            messageNumber: '',
            replyInfo: '',
            goodsId: ''
        })
    },
    // 发表留言
    postMessage: function() {
        const _this = this;
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
    },
    // 修改留言内容
    changeMessage: function(e) {
        this.setData({
            replyInfo: e.detail.value
        })
    },
    // 请求回复本人的留言
    getMessageList: function(isConcat, page) {
        const Concat = isConcat || false;
        const currentPage = page || 1;
        const _this = this;
        var reqTask = wx.request({
            url: 'https://www.yxxcloud.cn/api/selectAllMyMessage',
            data: {
                openID: wx.getStorageSync('userID'),
                userName: wx.getStorageSync('nickName'),
                currentPage
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                wx.hideToast();
                const messageList = result.data.messagelist;
                let newlist = '';
                for (let i = 0; i < messageList.length; i++) {
                    messageList[i].createTime = app.transformTime(messageList[i].createTime)
                }
                if (Concat) {
                    newlist = _this.data.messageList.concat(messageList)
                } else {
                    newlist = messageList
                }
                if (messageList.length === 10) {
                    _this.setData({
                        allPage: _this.data.allPage += 1
                    })
                }
                this.setData({
                    requesting: false,
                    messageList: newlist
                })
            },
            fail: () => {},
            complete: () => {}
        });

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        wx.setTabBarBadge({
            index: 2,
            text: `${app.globalData.globalDataUnreadNum}`
        })
        if (app.globalData.globalDataUnreadNum <= 0) {
            app.globalData.globalDataUnreadNum = 0
            wx.removeTabBarBadge({
                index: 2,
            })
        }
        this.getChatList()
        updataNewInterval = setInterval(() => {
                this.updataNew()
            }, 1000)
            // this.getMessageList()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        clearInterval(updataNewInterval)
        updataNewInterval = null
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

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
            if (_this.data.type === 0) {
                _this.getChatList(true, _this.data.nowPage)
            } else {
                _this.getMessageList(true, _this.data.nowPage)
            }
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})