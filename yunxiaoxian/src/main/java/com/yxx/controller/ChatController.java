package com.yxx.controller;


import com.alibaba.fastjson.JSONObject;
import com.yxx.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;

    //获取聊天列表
    @PostMapping("getChatList")
    @ResponseBody
    public JSONObject getChatList(String openID, Integer currentPage){

        return chatService.getChatList(openID, (currentPage - 1) * 15);
    }

    //删除聊天列表
    @PostMapping("deleteChatList")
    @ResponseBody
    public JSONObject deleteChatList(String A_openID, String B_openID, Integer goodsID){

        return chatService.deleteChatList(A_openID, B_openID, goodsID);
    }

    //“我想要”按钮--添加到聊天列表
    @PostMapping("iWant")
    @ResponseBody
    public JSONObject iWant(String A_openID, String B_openID, Integer goodsID){

        return chatService.iWant(A_openID, B_openID, goodsID);
    }

    //上传聊天图片
    @PostMapping("uploadPicture")
    @ResponseBody
    public JSONObject uploadPicture(String myFile){

        return chatService.uploadPicture(myFile);
    }
}