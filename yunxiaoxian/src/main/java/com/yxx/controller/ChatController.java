package com.yxx.controller;


import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.image;
import com.yxx.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;


@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;

//    public static void main(String[] args) {
//        JSONObject json = new JSONObject();
//        List<image> list = new ArrayList<image>();
//        String[] str = {"test","test","test"};
//        image temp = new image();
//        temp.setUrl(str);
//        temp.setTest(str);
//
//        list.add(temp);
//        String str1=json.toJSON(list).toString();
//        System.out.println(str1);
//    }

}