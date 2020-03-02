const app = getApp();
// pages/myIssue/myIssue.js
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
        requesting: false,
        // 编辑的商品信息
        changeGood: {},
        // 编辑的商品的序列
        changeGoodIndex: -1,
        // 控制降价界面的显隐
        showDepreciateView: false,
        // 控制编辑界面的显隐
        showCompileView: false,
        types: [],
        // 类型index
        typeIndex: -1,
        imageChange: 0,
        images: [],
        uploadImages: []
    },
    // 请求数据
    getList: function(isConcat, page) {
        const _this = this;
        const Concat = isConcat || false;
        const newPage = page || 1
        wx.request({
            url: `https://www.yxxcloud.cn/api/selectAllMyPublishGoods?currentPage=${newPage}`,
            data: {
                openID: wx.getStorageSync('userID'),
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (result) => {
                const mypublishlist = result.data.mypublishlist;
                if (!mypublishlist) {
                    _this.data.request = false;
                    return false
                };
                for (let i = 0; i < mypublishlist.length; i++) {
                    // 判断商品是否售出
                    if (mypublishlist[i].status !== 0) {
                        mypublishlist[i].allDisabled = true
                    } else {
                        // 判断距离发表时间是否超过一天
                        mypublishlist[i].allDisabled = false;
                        mypublishlist[i].compileDisabled = false;
                        const status = new Date().getTime() - new Date(mypublishlist[i].createTime).getTime() - 1000 * 60 * 60 * 24;
                        if (status >= 0) {
                            mypublishlist[i].disabled = false
                        } else {
                            mypublishlist[i].disabled = true
                        }
                    }
                    mypublishlist[i].createTime = app.transformTime(mypublishlist[i].createTime)
                }
                let newlist = '';
                if (Concat) {
                    newlist = _this.data.goodsList.concat(mypublishlist)
                } else {
                    newlist = mypublishlist
                }
                //停止加载动画
                wx.hideToast();
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
    // 刷新商品
    refresh: function(options) {
        const _this = this;
        const goodsID = options.currentTarget.dataset.sid;
        const index = options.currentTarget.dataset.index;
        wx.request({
            url: `https://www.yxxcloud.cn/api/polishGoods`,
            data: {
                openID: wx.getStorageSync('userID'),
                goodsID
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (result) => {
                const disabled = `goodsList[${index}].disabled`;
                _this.setData({
                    [disabled]: true
                })
                if (!result.data.status) {
                    return wx.showToast({
                        title: '一天刷新一次哦',
                        image: '../../public/images/jinggao.png',
                        duration: 800
                    })
                }
                const createTime = `goodsList[${index}].createTime`;
                _this.setData({
                    [createTime]: "刚刚",
                })
                return wx.showToast({
                    title: '刷新成功',
                    icon: 'success',
                    duration: 800
                })
            },
            fail: () => {
                wx.showToast({
                    title: '出错啦！',
                    image: '../../public/images/jinggao.png',
                    duration: 800
                })
            },
            complete: () => {}
        });
    },
    // 开启降价视图
    showDepreciate: function(options) {
        this.setData({
            showDepreciateView: true,
            changeGood: options.currentTarget.dataset.good,
            changeGoodIndex: options.currentTarget.dataset.index
        })
    },
    // 降价
    depreciate: function(options) {
        const _this = this;
        const goodsId = this.data.changeGood.goodsId;
        const newPrice = options.detail.value.price;
        const oldPrice = this.data.changeGood.goodsPrice;
        const index = this.data.changeGoodIndex;
        if (oldPrice <= newPrice) {
            return wx.showToast({
                title: '现价应低于原价',
                image: '../../public/images/jinggao.png',
                duration: 800
            })
        }
        wx.request({
            url: 'https://www.yxxcloud.cn/api/updateGoodsByGoods',
            data: {
                openID: wx.getStorageSync('userID'),
                theKey: 0,
                goodsId,
                goodsPrice: newPrice
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                if (!result.data.status) {
                    return wx.showToast({
                        title: '出错啦！',
                        image: '../../public/images/jinggao.png',
                        duration: 800
                    })
                }
                const price = `goodsList[${index}].goodsPrice`;
                _this.setData({
                    [price]: newPrice
                })
                _this.closeDepreciate()
                return wx.showToast({
                    title: '改价成功',
                    icon: 'success',
                    duration: 800
                })

            },
            fail: () => {
                return wx.showToast({
                    title: '出错啦！',
                    image: '../../public/images/jinggao.png',
                    duration: 800
                })
            },
            complete: () => {}
        });

    },
    // 关闭降价视图
    closeDepreciate: function() {
        this.setData({
            showDepreciateView: false,
            changeGood: {},
            changeGoodIndex: -1
        })
    },
    // 开启编辑视图
    showCompile: function(options) {
        this.setData({
            showCompileView: true,
            changeGood: options.currentTarget.dataset.good,
            changeGoodIndex: options.currentTarget.dataset.index
        });
        const baseImages = options.currentTarget.dataset.good.goodsImage;
        for (let i = 0; i < baseImages.length; i++) {
            this.changeImg(`${this.data.url}${baseImages[i]}`).then(res => {
                const newImg = `data:image/jpg;base64,${res}`
                const newImg2 = `data:image/jpg;base64+${res}`
                this.data.uploadImages.push(newImg2)
                const newImg3 = `images[${i}]`
                this.setData({
                    [newImg3]: newImg,
                })
            })
        }

    },
    // 编辑
    compile: function(options) {
        const _this = this;
        const form = options.detail.value;
        const changeGood = this.data.changeGood
            //判断是否为空
        if (form.title.length === 0) {
            return wx.showToast({
                title: '商品名不得为空',
                image: '../../public/images/jinggao.png',
                duration: 1000
            })
        } else if (form.info.length === 0) {
            return wx.showToast({
                title: '商品描述不为空',
                image: '../../public/images/jinggao.png',
                duration: 1000
            })

        } else if (_this.data.uploadImages.length === 0) {
            return wx.showToast({
                title: '商品图片不为空',
                image: '../../public/images/jinggao.png',
                duration: 1000
            })
        } else if (form.price.length === 0) {
            return wx.showToast({
                title: '商品价格不为空',
                image: '../../public/images/jinggao.png',
                duration: 1000
            })
        } else if (form.type === -1) {
            return wx.showToast({
                title: '商品类型不为空',
                image: '../../public/images/jinggao.png',
                duration: 1000
            })
        }
        // 判断是否修改
        // if (this.data.imageChange === 0 && form.title === changeGood.goodsName && form.info === changeGood.goodsDescribe && form.price == changeGood.goodsPrice && form.type === changeGood.categoryId) {
        //     return wx.showToast({
        //         title: '请做出修改！',
        //         image: '../../public/images/jinggao.png',
        //         duration: 1000
        //     })
        // }
        const openID = wx.getStorageSync('userID');
        const good = {
            goodsId: this.data.changeGood.goodsId,
            goodsName: form.title,
            goodsDescribe: form.info,
            goodsPrice: form.price,
            categoryId: form.type,
            goodsImage: this.data.changeGood.goodsImage,
            createTime: this.data.changeGood.createTime,
            currentPage: null,
            openID,
            saleTime: null,
            status: 0
        }
        const { goodsId, goodsName, goodsDescribe, goodsPrice, categoryId, } = good;
        const myfile = _this.data.uploadImages;
        wx.request({
            url: 'https://www.yxxcloud.cn/api/updateGoodsByGoods',
            data: {
                openID,
                theKey: _this.data.imageChange,
                goodsId,
                goodsName,
                goodsDescribe,
                goodsPrice,
                categoryId,
                myfile,
                imageStrings: _this.data.changeGood.goodsImage
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                if (!result.data.status) {
                    return wx.showToast({
                        title: '出错啦！',
                        image: '../../public/images/jinggao.png',
                        duration: 800
                    })
                }
                const newGood = `goodsList[${_this.data.changeGoodIndex}]`;
                const compileDisabled = `goodsList[${_this.data.changeGoodIndex}].compileDisabled`;
                _this.setData({
                    [newGood]: good,
                    [compileDisabled]: true
                })
                _this.closeCompile()
                return wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 800
                })

            },
            fail: () => {
                return wx.showToast({
                    title: '出错啦！',
                    image: '../../public/images/jinggao.png',
                    duration: 800
                })
            },
            complete: () => {}
        });

    },
    // 关闭编辑视图
    closeCompile: function() {
        this.setData({
            showCompileView: false,
            changeGood: {},
            changeGoodIndex: -1,
            images: [],
            uploadImages: [],
            imageChange: 0
        })
    },
    // 下架
    soldOut: function(options) {
        const _this = this;
        const goodsId = options.currentTarget.dataset.sid;
        const index = options.currentTarget.dataset.index;
        wx.showModal({
            title: '提示',
            content: '确定要下架吗？',
            success: function(sm) {
                if (sm.confirm) {
                    wx.request({
                        url: 'https://www.yxxcloud.cn/api/pullOffShelves',
                        data: {
                            openID: wx.getStorageSync('userID'),
                            goodsID: goodsId
                        },
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        method: 'POST',
                        dataType: 'json',
                        responseType: 'text',
                        success: (result) => {
                            if (!result.data.status) {
                                return wx.showToast({
                                    title: '出错啦！',
                                    image: '../../public/images/jinggao.png',
                                    duration: 800
                                })
                            }
                            _this.data.goodsList.splice(index, 1)
                            _this.setData({
                                goodsList: _this.data.goodsList
                            })
                            return wx.showToast({
                                title: '下架成功',
                                icon: 'success',
                                duration: 800
                            })

                        },
                        fail: () => {
                            return wx.showToast({
                                title: '出错啦！',
                                image: '../../public/images/jinggao.png',
                                duration: 800
                            })
                        },
                        complete: () => {}
                    });
                }
            }
        })
    },
    // 类型选择器更新选择内容
    bindPickerChange: function(e) {
        this.setData({
            typeIndex: e.detail.value
        })
    },
    // 网络图片转化成base64位
    changeImg: function(img) {
        return new Promise((resolve, reject) => {
            wx.downloadFile({
                url: img,
                success(res) {
                    wx.getFileSystemManager().readFile({
                        filePath: res.tempFilePath, //选择图片返回的相对路径
                        encoding: 'base64', //编码格式
                        success: res => { //成功的回调
                            resolve(res.data)
                        }
                    })
                }
            })
        })
    },
    // 移除添加的图片
    deleteImage: function(options) {
        let arrayImageSelf = this.data.images;
        let arrayImageUpload = this.data.uploadImages;
        const index = options.currentTarget.dataset.index;
        arrayImageSelf.splice(index, 1);
        arrayImageUpload.splice(index, 1);
        this.setData({
            images: arrayImageSelf,
            uploadImages: arrayImageUpload,
            imageChange: 1
        })


    },
    // 添加图片
    addImage() {
        const _this = this;
        wx.chooseImage({
            count: 6,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                let arrayImageSelf = _this.data.images;
                let arrayImageUpload = _this.data.uploadImages;
                const tempFilePaths = res.tempFilePaths;
                const images = [];
                const uploadImages = [];
                for (let i = 0; i < tempFilePaths.length; i++) {
                    const uploadImg = "data:image/jpg;base64+" + wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], "base64");
                    const selfImg = "data:image/jpg;base64," + wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], "base64");
                    uploadImages.push(uploadImg)
                    images.push(selfImg)
                }
                const newArrayImageSelf = arrayImageSelf.concat(images);
                const newArrayImageUpload = arrayImageUpload.concat(uploadImages);
                _this.setData({
                    images: newArrayImageSelf,
                    uploadImages: newArrayImageUpload,
                    imageChange: 1
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            types: app.globalData.navList
        })
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