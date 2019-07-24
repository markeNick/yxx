package com.yxx.pojo;

import org.apache.commons.lang3.StringUtils;

public class MessageCustom extends Message {
    private String userName;
    private String userImage;
    private int count;
    private String[] goodsImage;
    public String getGoodsImage() {
        //将字符串数组转为字符串并以 “，” 作为分隔符
        return StringUtils.join(goodsImage, ",");
    }

    public void setGoodsImage(String goodsImage) {

        //将字符串转成字符串数组
        this.goodsImage = goodsImage.split(",");
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }


}
