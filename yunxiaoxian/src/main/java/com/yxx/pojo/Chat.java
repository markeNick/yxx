package com.yxx.pojo;

public class Chat {
    private Integer chatId;
    private String AOpenID;
    private String BOpenID;
    private String content;

    public Integer getChatId() {
        return chatId;
    }

    public void setChatId(Integer chatId) {
        this.chatId = chatId;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}