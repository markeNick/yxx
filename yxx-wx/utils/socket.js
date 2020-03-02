// 判断socket是否连接

let socketOpen = false

// 判断socket是否关闭连接

let socketClose = false

// 如果连接处于关闭状态 就先把信息存储到数组中

let socketMsgQueue = []

// 判断心跳变量

let heart = ''

// 心跳失败次数

let heartBeatFailCount = 0

// 心跳 定时器

let heartBeatTimeOut = null

//重新连接 定时器

let connectSocketTimeOut = null

// 创建对象

const webSocket = {
    //开始连接
    connectSocket: function(e) {
        //重置数据
        socketOpen = false
        socketClose = false
        socketMsgQueue = []
            //发送连接请求
        wx.connectSocket({
            url: `wss://www.yxxcloud.cn/yunxiaoxian-1.0-SNAPSHOT/websocket?openID=${e}`,
            success: () => {
                console.log('开始连接')
            }
        })
    },
    //发送信息
    sendSocket: function(object) {
        //判断连接是否开启
        if (socketOpen) {
            wx.sendSocketMessage({
                data: object.msg,
                success: (res) => {
                    // console.log(res)
                    if (object) {
                        object.success(res)
                    }
                },
                fail: (res) => {
                    if (object) {
                        object.fail(res)
                    }
                }
            })
        } else {
            //将信息存储到信息列表中
            socketMsgQueue.push(object)
        }
    },

    //接收信息 留着给别的函数替代
    onSocketMessageCallBack: function(msg) {

    },

    //关闭连接
    closeSocket: function() {
        //如果定时器存在 就清楚定时器
        if (connectSocketTimeOut) {
            clearTimeout(connectSocketTimeOut);
            connectSocketTimeOut = null;
        }
        socketClose = true
        this.closeHeartBeat()
        wx.closeSocket({
            success: function(res) {
                console.log('连接 已关闭！');
            },
            fail: function(res) {
                console.log('连接关闭势必！' + res);
            }
        })
    },


    //开始心跳
    startHeartBeat: function() {
        heart = 'heart'
        this.heartBeat()
    },
    //心跳
    heartBeat: function() {
        const _this = this;
        if (!heart) return;
        webSocket.sendSocket({
            msg: JSON.stringify({
                'formUser': 'test-8',
                'toUser': '66',
                'content': 'dada',
                'theTime': '2018-15-10 22:55:11'
            }),
            success: function() {
                console.log('socket心跳成功');
                if (heart) {
                    heartBeatTimeOut = setTimeout(() => {
                        _this.heartBeat();
                    }, 7000);
                }
            },
            fail: function() {
                // console.log('socket心跳失败');
                if (heartBeatFailCount > 2) {
                    // 重连
                    _this.connectSocket();
                }
                if (heart) {
                    heartBeatTimeOut = setTimeout(() => {
                        _this.heartBeat();
                    }, 7000);
                }
                heartBeatFailCount++;
            }
        })
    },
    //关闭心跳
    closeHeartBeat: function() {
        heart = ''
        console.log('结束心跳')
            //清楚定时器
        if (heartBeatTimeOut) {
            clearTimeout(heartBeatTimeOut);
            heartBeatTimeOut = null;
        }
        if (connectSocketTimeOut) {
            clearTimeout(connectSocketTimeOut);
            connectSocketTimeOut = null;
        }
    }
}

// 监听连接打开事件 回调函数

wx.onSocketOpen(res => {
    console.log('WebSocket连接已打开！')
        //如果此时正好准备关闭的话 就继续关闭
    if (socketClose) {
        webSocket.closeSocket()
    } else {
        socketOpen = true
            //如果存在未发送出去的数据的话，则发送一次
        for (let i = 0; i < socketMsgQueue.length; i++) {
            webSocket.sendSocket(socketMsgQueue[i])
        }
        socketMsgQueue = []
        webSocket.startHeartBeat();
    }
})

//监听连接出错事件 错误信息

wx.onSocketError(res => {
    console.log('错误信息' + res)
})

//监听服务器传来的消息 回调函数

wx.onSocketMessage(res => {
    console.log('收到服务器的内容' + res.data)
    webSocket.onSocketMessageCallBack(res.data)
})

//监听连接关闭事件 回调函数
wx.onSocketClose(res => {
    console.log('连接关闭了')
        //如果不是自己关闭的话 就重新连接
    if (!socketClose) {
        //清理定时器 重新设置定时器
        clearTimeout(connectSocketTimeOut)
        connectSocketTimeOut = setTimeout(() => {
            webSocket.connectSocket()
        }, 3000)
    }
})

// 导出对象

module.exports = webSocket