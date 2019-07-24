package com.yxx.pojo;

import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;

public class OrderCustom extends Orders {
    private String goodsName;
    private BigDecimal goodsPrice;
    private String[] goodsImage;
    public String getGoodsImage() {
        //将字符串数组转为字符串并以 “，” 作为分隔符
        return StringUtils.join(goodsImage, ",");
    }

    public void setGoodsImage(String goodsImage) {

        //将字符串转成字符串数组
        this.goodsImage = goodsImage.split(",");
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

    private String userName;
    private String userImage;
    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public BigDecimal getGoodsPrice() {
        return goodsPrice;
    }

    public void setGoodsPrice(BigDecimal goodsPrice) {
        this.goodsPrice = goodsPrice;
    }




}
