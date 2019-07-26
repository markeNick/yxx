package com.yxx.pojo;


public class MessageCustom extends Message {
    private String userName;
    private String userImage;
    private int count;
    private String[] goodsImage;
    public String[] getGoodsImage() {
        return goodsImage;
    }
    public void setGoodsImage(String[] goodsImage) {
        this.goodsImage = goodsImage;
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
