package com.yxx.pojo;

import java.util.Date;

public class ChatList {
    private Integer chatListId;
    private String AOpenID;
    private String BOpenID;
    private Date modifyTime;

    private String userName;
    private String userImage;

    public Integer getChatListId() {
        return chatListId;
    }

    public void setChatListId(Integer chatListId) {
        this.chatListId = chatListId;
    }

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