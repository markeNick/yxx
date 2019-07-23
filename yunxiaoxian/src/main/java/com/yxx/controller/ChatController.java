package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.User;
import com.yxx.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;

    public void test(){
        JSONObject json = new JSONObject();
        List a = new ArrayList();
        json.toJSONString();
    }

//    public static void main(String[] args) {
//        JSONObject json = new JSONObject();
//        List<image> list = new ArrayList<image>();
//
//        image image1 = new image();
//
//        String[] str = {"test", "test", "test"};
//        image1.setUrl(str);
//        image1.setOpenID("tang");
//        image1.setGoodsId(12);
//        image1.setGoodsDescribe("miaosu");
//        image1.setGoodsName("name");
//
//        list.add(image1);
//
//        String str1=json.toJSON(list).toString();
//
//        System.out.println(str1);
//    }

    public static void main(String[] args) {
        String[] str = {"test", "test", "test"};
        System.out.println(str.toString());
    }
}