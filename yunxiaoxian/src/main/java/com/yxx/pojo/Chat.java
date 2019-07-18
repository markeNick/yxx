package com.yxx.pojo;

public class Chat {
    private Integer chat_id;
    private String A_openID;
    private String B_openID;
    private String content;

    public Integer getChat_id() {
        return chat_id;
    }

    public void setChat_id(Integer chat_id) {
        this.chat_id = chat_id;
    }

    public String getA_openID() {
        return A_openID;
    }

    public void setA_openID(String a_openID) {
        A_openID = a_openID;
    }

    public String getB_openID() {
        return B_openID;
    }

    public void setB_openID(String b_openID) {
        B_openID = b_openID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}