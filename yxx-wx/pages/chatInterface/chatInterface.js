const webSocket = require('../../utils/socket')
const app = getApp();
let getUNreadTimeout = null
    // pages/chatInterface/chatInterface.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        good: {
            goodId: '',
            goodPrice: '',
            goodImage: '',
            seller: '',
            status: 0
        },
        //滚动到底部的ID值，用来确定定位
        toView: 'chat-0',
        url: app.globalData.url,
        picUrl: 'https://www.yxxcloud.cn/chatpic/',
        selfImage: '',
        selfID: '',
        otherID: '',
        otherName: '',
        otherImage: '',
        message: '',
        // 一个负责显示聊天记录，一个负责修改聊天记录
        chatList: [],
        storageList: [],
        listIndex: 0,
        nowPage: 1,
        atLast: false,
        requesting: false
    },
    // 售出商品
    workOff: function() {
        const _this = this
        wx.showModal({
            title: '提示',
            content: '是否将商品卖给对方？',
            success: function(res) {
                if (res.confirm) {
                    wx.request({
                        url: 'https://www.yxxcloud.cn/api/soldMyGoods',
                        data: {
                            buyer: _this.data.otherID,
                            seller: wx.getStorageSync('userID'),
                            goodsId: _this.data.good.goodId
                        },
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        method: 'POST',
                        dataType: 'json',
                        responseType: 'text',
                        success: (result) => {
                            if (result.data.status) {
                                const good = `good.status`
                                _this.setData({
                                    [good]: 1
                                })
                                wx.showToast({
                                    title: '售出成功！',
                                    icon: 'success',
                                    duration: 500
                                });
                                _this.send(true, false)
                            } else {
                                wx.showToast({
                                    title: '出错啦！',
                                    image: '../../public/images/jinggao.png',
                                    duration: 500
                                });
                            }
                        },
                        fail: () => {},
                        complete: () => {}
                    });
                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 添加图片
    addImage() {
        const _this = this;
        wx.chooseImage({
            count: 5,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                for (let i = 0; i < tempFilePaths.length; i++) {
                    if (res.tempFiles[i].size > 2000000) {
                        wx.showToast({
                            title: '图片不能大于2M!', //标题
                            image: '../../public/images/jinggao.png',
                        })
                        continue
                    }
                    const uploadImg = "data:image/jpg;base64+" + wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], "base64");
                    wx.request({
                        url: 'https://www.yxxcloud.cn/api/uploadPicture',
                        data: { myFile: uploadImg },
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        method: 'POST',
                        dataType: 'json',
                        responseType: 'text',
                        success: (result) => {
                            if (result.data.status) {
                                _this.send(false, true, result.data.imageName)
                            }
                        },
                        fail: (err) => { console.log(err) },
                        complete: () => {}
                    });
                }
            }
        })
    },
    //修改输入框内容
    changeMessage(e) {
        this.setData({
            message: e.detail.value
        })
    },
    // 获得当前时间并转化为 yyyy-MM-DD HH:mm:ss格式
    transformTime() {
        const time = new Date();
        let getYear = time.getFullYear();
        let getMonth = time.getMonth() + 1;
        let getDay = time.getDate();
        let getHour = time.getHours();
        let getMin = time.getMinutes();
        let getSeconds = time.getSeconds();
        return `${getYear}-${getMonth < 10 ? '0' + getMonth : getMonth}-${getDay < 10 ? '0' + getDay : getDay} ${getHour < 10 ? '0' + getHour : getHour}:${getMin < 10 ? '0' + getMin : getMin}:${getSeconds < 10 ? '0' + getSeconds : getSeconds}`
    },
    // 发送信息按钮
    sendButton() {
        this.send(false, false)
    },
    // 发送信息
    send(type, isPic, picName) {
        if (type) {
            _this.setData({
                message: '交易完成！'
            })
        }
        if (this.data.message === '' && !isPic) {
            return wx.showToast({
                title: '输入的内容为空！',
                image: '../../public/images/jinggao.png',
            });
        }
        const _this = this;
        let msg;
        if (isPic) {
            msg = {
                fromUser: _this.data.selfID,
                toUser: _this.data.otherID,
                content: picName,
                theTime: _this.transformTime(),
                goodsId: _this.data.good.goodId,
                type: type,
                isPic: true
            }
        } else {
            msg = {
                fromUser: _this.data.selfID,
                toUser: _this.data.otherID,
                content: _this.data.message,
                theTime: _this.transformTime(),
                goodsId: _this.data.good.goodId,
                type: type,
                isPic: false
            }
        }
        webSocket.sendSocket({
            msg: JSON.stringify(msg),
            success: (result) => {
                const otherAndGood = _this.data.otherID + _this.data.good.goodId
                msg.isSelf = true
                app.globalData.readValue[otherAndGood].push(msg)
                _this.data.chatList.push(msg)
                _this.data.storageList.push(msg)
                _this.data.listIndex += 1
                _this.setData({
                    chatList: _this.data.chatList,
                    showList: _this.data.chatList.slice(-this.data.listIndex),
                    toView: `chat-${this.data.chatList.length - 1}`,
                    message: ''
                })
                wx.setStorageSync(otherAndGood, _this.data.storageList)
                if (_this.data.storageList.length >= 80) {
                    _this.storeMYSQL()
                }
            },
            fail: () => {}
        });
    },
    // 当聊天记录达到80条的时候存入60条 保存20条
    storeMYSQL: function() {
        const _this = this
        const otherAndGood = this.data.otherID + this.data.good.goodId
        const globalData = app.globalData.readValue
            // 全局对应的聊天缓存
        const chatRecord = this.data.storageList.slice(0, 60)
        const chatRecords = JSON.stringify(chatRecord)
        wx.request({
            url: 'https://www.yxxcloud.cn/api/uploadChatRecord',
            data: chatRecords,
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                if (result.data.status) {
                    globalData[otherAndGood].splice(0, 60)
                    _this.data.storageList.splice(0, 60)
                    wx.setStorageSync(otherAndGood, _this.data.storageList)
                    _this.setData({
                        chatList: _this.data.storageList,
                        listIndex: 20,
                        toView: `chat-${19}`,
                        nowPage: 1,
                        atLast: false,
                        requesting: false
                    })
                }
            },
            fail: () => {
                return wx.showToast({
                    title: '出错啦！',
                    icon: 'none',
                    duration: 800
                })
            },
            complete: () => {}
        })
    },
    //将缓存中未读的内容转化为已读的
    shiftUnread: function(userID, flag = false) {
        // 查看是否有新消息进入，如果有transfer为true，然后执行下面的操作
        if (app.globalData.transfer || flag) {
            //如果本地缓存里面的未读信息存在该值的话
            if (wx.getStorageSync(`UNREAD${userID}`)) {
                const newsList = wx.getStorageSync(`UNREAD${userID}`)
                    // 获得未读信息的长度
                const unreadNum = newsList.length
                app.globalData.globalDataUnreadNum -= unreadNum
                this.data.storageList = this.data.storageList.concat(newsList)
                    // 获得未读列表的内容，并将该元素删除，更新未读列表
                const unreadList = wx.getStorageSync('globalDataUnreadKey')
                const index = unreadList.findIndex((value) => {
                    return value === userID
                })
                unreadList.splice(index, 1)
                wx.setStorageSync(userID, this.data.storageList)
                wx.setStorageSync('globalDataUnreadKey', unreadList)
                wx.removeStorageSync(`UNREAD${userID}`);
                this.setData({
                    chatList: this.data.chatList.concat(newsList),
                    listIndex: unreadNum + this.data.listIndex,
                    toView: `chat-${this.data.chatList.length - 1}`
                })
                if (this.data.storageList.length >= 80) {
                    this.storeMYSQL()
                }
            }
            // 接收完消息后，将transfer关闭
            app.globalData.transfer = false
        }
    },
    //将缓存或者数据库中的值取出来
    addChat: function() {
        if (this.data.atLast) return wx.showToast({
            title: '到底啦',
            duration: 500,
        });
        if (this.data.requesting) return wx.showToast({
            title: '正在请求中',
            icon: 'loading',
            duration: 10000,
        });
        const _this = this
        const datas = this.data
            // 获得当前消息的数量 和 当前缓存中的数量，进行比较
        const nowLength = this.data.listIndex
        const storageLength = this.data.storageList.length
        const reduce = storageLength - nowLength
        wx.hideToast();
        if (reduce >= 20) {
            datas.listIndex = 20 + datas.listIndex;
            this.setData({
                listIndex: datas.listIndex,
                chatList: this.data.storageList.slice(-(datas.listIndex)),
                // toView: `chat-${this.data.chatList.length-1}`
            })
        } else if (reduce > 0) {
            datas.listIndex = reduce + datas.listIndex,
                this.setData({
                    listIndex: datas.listIndex,
                    chatList: this.data.storageList.slice(-(this.data.listIndex)),
                    // toView: `chat-${this.data.chatList.length-1}`
                })
        } else {
            datas.requesting = true
            wx.request({
                url: 'https://www.yxxcloud.cn/api/getChatRecord',
                data: {
                    A_openID: datas.selfID,
                    goodsId: datas.good.goodId,
                    currentPage: datas.nowPage
                },
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                    wx.hideToast();
                    const list = result.data.chatRecordList.reverse()
                    if (list.length === 20) {
                        datas.nowPage += 1
                    } else {
                        datas.atLast = true
                    }
                    datas.listIndex = list.length + datas.listIndex,
                        _this.setData({
                            listIndex: datas.listIndex,
                            chatList: list.concat(datas.chatList)
                        })
                },
                fail: () => {
                    return wx.showToast({
                        title: '出错啦！',
                        icon: 'none',
                        duration: 800
                    })
                },
                complete: () => {
                    datas.requesting = false
                }
            });

        }
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function(options) {
        const _this = this
        const value = options.other + options.goodId
            //判断本地缓存是否存在该值，如果不存在，则赋予一个空值
        if (!wx.getStorageSync(value)) {
            wx.setStorageSync(value, [])
        }
        // 如果首页缓存中不存在，则把本地缓存中的值取出来
        // 先拿出已经存在的值，再拿出未读的值进行拼接
        const thisList = wx.getStorageSync(value)
        if (!app.globalData.readValue[value]) {
            app.globalData.readValue[value] = thisList
        }
        const good = {
            goodId: options.goodId,
            goodPrice: options.price,
            goodImage: options.goodPic,
            seller: options.seller,
            status: options.status
        }
        app.globalData.fromUserAndGoodsId = value;
        app.globalData.globalDataUnreadValue[value] = [];
        this.setData({
                selfID: options.me,
                otherID: options.other,
                otherName: options.otherName,
                otherImage: options.otherImage,
                selfImage: wx.getStorageSync('avatarUrl'),
                chatList: thisList.slice(-20),
                storageList: thisList,
                good,
                toView: `chat-${thisList.length===20?'19':thisList.length-1}`,
                listIndex: thisList.length === 20 ? '19' : thisList.length - 1,
            })
            //查看是否存在未读消息，如果存在，则把未读的信息更新到该值中，并移除未读中的值
        this.shiftUnread(value, true)
        getUNreadTimeout = setInterval(() => {
            _this.shiftUnread(value)
        }, 1000)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        clearInterval(getUNreadTimeout)
        getUNreadTimeout = null
        app.globalData.fromUserAndGoodsId = null
        app.globalData.globalDataUnreadValue[this.data.otherID] = [];
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        // window.alert(1)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})