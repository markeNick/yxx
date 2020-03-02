const webSocket = require('./utils/socket');
// let globalDataUnreadKey = [];
// let globalDataUnreadValue = {};
//app.js
App({
    onLaunch: function() {
        if (wx.getStorageSync('Authorization')) {
            this.login();
            if (wx.getStorageSync('globalDataUnreadKey')) {
                this.globalData.globalDataUnreadKey = wx.getStorageSync('globalDataUnreadKey')
                this.globalData.readKey = wx.getStorageSync('globalDataUnreadKey')
                for (let i = 0; i < this.globalData.globalDataUnreadKey.length; i++) {
                    const element = this.globalData.globalDataUnreadKey[i];
                    this.globalData.readValue[element] = wx.getStorageSync(`UNREAD${element}`)
                    this.globalData.globalDataUnreadValue[element] = wx.getStorageSync(`UNREAD${element}`)
                    this.globalData.globalDataUnreadNum += this.globalData.globalDataUnreadValue[element].length
                }
                if (this.globalData.globalDataUnreadNum != 0) {
                    wx.setTabBarBadge({
                        index: 2,
                        text: `${this.globalData.globalDataUnreadNum}`
                    })
                }
            } else {
                wx.setStorageSync('globalDataUnreadKey', [])
            }
        }
    },
    // 登录
    login: function() {
        const _this = this;
        // 登录
        wx.login({
            success(res) {
                wx.request({
                    url: `https://www.yxxcloud.cn/api/getOpenID`,
                    data: { code: res.code },
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    method: 'POST',
                    dataType: 'json',
                    responseType: 'text',
                    success: (res) => {
                        wx.setStorageSync('userID', res.data.openID);
                        // 更新用户的头像和名称 保存到本地
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                            success: (res) => {
                                if (res.userInfo) {
                                    const nickName = res.userInfo.nickName;
                                    const avatarUrl = res.userInfo.avatarUrl;
                                    wx.setStorageSync('nickName', nickName);
                                    wx.setStorageSync('avatarUrl', avatarUrl);
                                    // 发送请求更新数据库
                                    wx.request({
                                        url: 'https://www.yxxcloud.cn/api/updateUser',
                                        data: {
                                            openID: wx.getStorageSync('userID'),
                                            userName: nickName,
                                            userImage: avatarUrl
                                        },
                                        method: 'POST',
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        success: (res) => {
                                            if (res.data.status) {
                                                webSocket.connectSocket(wx.getStorageSync('userID'))
                                                webSocket.onSocketMessageCallBack = _this.onSocketMessageCallBack
                                            } else {
                                                wx.showToast({
                                                    title: '数据更新失败',
                                                    duration: 1000,
                                                });
                                            }
                                        },
                                    })
                                }
                            }
                        });
                    },
                    fail: () => {},
                    complete: () => {}
                });
            }
        })
    },
    onSocketMessageCallBack: function(msg) {
        // 将接收的字符串转化成JSON
        let jsonMsg = JSON.parse(msg)
        this.globalData.transfer = true
            //如果是离线消息的话
        if (jsonMsg.chatList) {
            //循环接收离线时别人发送的消息
            for (let index = 0; index < jsonMsg.chatList.length; index++) {
                const element = jsonMsg.chatList[index];
                element.isSelf = false
                    // 取出发送者的ID
                const key = element.fromUser + element.goodsId;
                // 判断未读信息名字数组栏中是否存在
                const haveNo = this.globalData.globalDataUnreadKey.findIndex((value) => {
                    return value == key
                })
                if (haveNo > -1) {
                    // 如果存在 则在未读信息键值栏中添加该数据
                    console.log(this.globalData.globalDataUnreadValue)
                    this.globalData.readValue[key].push(element)
                    this.globalData.globalDataUnreadValue[key].push(element)
                } else {
                    // 如果不存在 在未读信息键值栏中创建并添加该数据
                    this.globalData.globalDataUnreadKey.push(key);
                    this.globalData.globalDataUnreadValue[key] = [];
                    this.globalData.globalDataUnreadValue[key].push(element)
                    this.globalData.readKey.push(key);
                    this.globalData.readValue[key] = [];
                    this.globalData.readValue[key].push(element)
                }
                wx.setStorageSync(`UNREAD${key}`, this.globalData.globalDataUnreadValue[key])
            }
            //更新数据
            wx.setStorageSync('globalDataUnreadKey', this.globalData.globalDataUnreadKey)
        } else {
            const key = jsonMsg.fromUser + jsonMsg.goodsId;
            jsonMsg.isSelf = false;
            // 在线发送的话
            // console.log(typeof globalDataUnreadKey)
            const haveNo = this.globalData.globalDataUnreadKey.findIndex((value) => {
                return value == key
            })
            if (this.globalData.fromUserAndGoodsId) {
                this.globalData.globalDataUnreadValue[this.globalData.fromUserAndGoodsId] = [];
            }
            if (haveNo > -1) {
                // 如果存在 则在未读信息键值栏中添加该数据
                this.globalData.globalDataUnreadValue[key].push(jsonMsg)
                this.globalData.readValue[key].push(jsonMsg)
            } else {
                // 如果不存在 在未读信息键值栏中创建并添加该数据
                this.globalData.globalDataUnreadKey.push(key);
                this.globalData.globalDataUnreadValue[key] = [];
                this.globalData.globalDataUnreadValue[key].push(jsonMsg);
                this.globalData.readKey.push(key);
                this.globalData.readValue[key] = [];
                this.globalData.readValue[key].push(jsonMsg)
            }
            //更新数据
            wx.setStorageSync(`UNREAD${key}`, this.globalData.globalDataUnreadValue[key])
            wx.setStorageSync('globalDataUnreadKey', this.globalData.globalDataUnreadKey)
            this.globalData.globalDataUnreadNum += 1
            wx.setTabBarBadge({
                index: 2,
                text: `${this.globalData.globalDataUnreadNum}`
            })
        }
    },
    // 授权
    Authorization: function() {
        const _this = this;
        return new Promise((resolve, reject) => {
            // 获取用户信息
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        _this.globalData.isAuthorization = false;
                        wx.showTabBar();
                        wx.setStorageSync("Authorization", true)
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        _this.login();
                        const res = {
                            isAuthorization: false
                        }
                        resolve(res)
                    } else {
                        _this.globalData.isAuthorization = true
                        wx.hideTabBar()
                        const res = {
                            isAuthorization: true
                        }
                        reject(res)
                    }
                }
            })
        })
    },
    // 转化时间
    // 接收的格式为 2019-07-24 12:16:24 
    // flag为true就2019-07-24 12:16:24 为false就为时间戳 默认true
    transformTime: function(timer, flag) {
        let result = '';
        const nowTime = new Date();
        const status = flag || true;
        let issueTime;
        //转化为时间戳
        if (status) {
            issueTime = new Date(timer).getTime();
        } else {
            issueTime = timer
        }
        const whenTime = nowTime - issueTime;
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const monthC = whenTime / month;
        const weekC = whenTime / (7 * day)
        const dayC = whenTime / day
        const hourC = whenTime / hour;
        const minC = whenTime / minute;
        if (monthC > 12) {
            result = timer
        } else if (monthC >= 1 & monthC <= 12) {
            result = parseInt(monthC) + "月前";
        } else if (weekC >= 1) {
            result = parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            result = parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            result = parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            result = parseInt(minC) + "分钟前";
        } else
            result = "刚刚";
        return result;
    },
    // 监听globalData实时变化的函数
    globalData: {
        fromUserAndGoodsId: null,
        isAuthorization: false,
        navList: [],
        url: 'https://www.yxxcloud.cn/pic/',
        globalDataUnreadKey: [],
        globalDataUnreadValue: {},
        transfer: false,
        globalDataUnreadNum: 0,
        readKey: [],
        readValue: {}
    }
})