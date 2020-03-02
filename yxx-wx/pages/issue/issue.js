// pages/issue/issue.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsName: "",
        goodsDescribe: "",
        goodsPrice: "",
        categoryId: "",
        myfile: [],
        openID: "",
        types: [
            { "id": 0, "type": "二手手机", "class": "icon-icon--" },
            { "id": 1, "type": "数码", "class": "icon-shuma" },
            { "id": 2, "type": "二手图书", "class": "icon-book" },
            { "id": 3, "type": "游戏交易", "class": "icon-youxi" },
            { "id": 4, "type": "服装鞋包", "class": "icon-Txu-" },
            { "id": 5, "type": "美妆闲置", "class": "icon-meizhuang" },
            { "id": 6, "type": "运动户外", "class": "icon-yundong" },
            { "id": 7, "type": "乐器", "class": "icon-gangqin" },
            { "id": 8, "type": "跑腿代办", "class": "icon-icon6" },
            { "id": 9, "type": "其他闲置", "class": "icon-qita-" }
        ],
        images: [],
        uploadImages: [],
        index: -1,
        priceHaveNo: false
    },
    changestatus: function() {
        this.setData({
            priceHaveNo: true
        })
    },
    // 修改价格
    addPrice: function(e) {
        if (e.detail.value.length > 0) {
            this.setData({
                priceHaveNo: true
            })
        } else {
            this.setData({
                priceHaveNo: false
            })
        }
    },
    // 类型选择器更新选择内容
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
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
            uploadImages: arrayImageUpload
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
                    uploadImages: newArrayImageUpload
                })
            }
        })
    },
    // 发布
    issusGoods(e) {
        const _this = this;
        const form = e.detail.value;
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

        //加载动画
        wx.showToast({
            title: '商品发布中。。',
            icon: 'loading',
            duration: 10000
        })
        wx.request({
            url: 'https://www.yxxcloud.cn/api/uploadGoods',
            data: {
                myfile: _this.data.uploadImages,
                goodsName: form.title,
                goodsDescribe: form.info,
                goodsPrice: form.price,
                categoryId: form.type,
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
                        duration: 800
                    })
                }
                //加载动画
                wx.showToast({
                    title: '上传成功！',
                    icon: 'success',
                    duration: 800
                });
                _this.setData({
                    myfile: [],
                    goodsName: '',
                    goodsDescribe: '',
                    goodsPrice: '',
                    categoryId: '',
                  images:[],
                  uploadImages:[]
                })
                setTimeout(function() {
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }, 800)
            },
            fail: (err) => { console.log(err) },
            complete: () => {}
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})