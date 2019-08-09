package com.yxx.pojo;

import java.util.Date;

public class ChatList {

    private String AOpenID;
    private String BOpenID;
    private Date modifyTime;
    private Integer goodsID;
    private Integer goodsStatus;

    //B（卖家）的用户名和头像
    private String userName;
    private String userImage;


    public String getAOpenID() {
        return AOpenID;
    }

    public void setAOpenID(String AOpenID) {
        this.AOpenID = AOpenID;
    }

    public String getBOpenID() {
        return BOpenID;
    }

    public void setBOpenID(String BOpenID) {
        this.BOpenID = BOpenID;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    public Integer getGoodsID() {
        return goodsID;
    }

    public void setGoodsID(Integer goodsID) {
        this.goodsID = goodsID;
    }

    public Integer getGoodsStatus() {
        return goodsStatus;
    }

    public void setGoodsStatus(Integer goodsStatus) {
        this.goodsStatus = goodsStatus;
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