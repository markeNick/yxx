package com.yxx.controller;


import com.yxx.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;



@Controller
public class ChatController {
    private static Logger logger = LoggerFactory.getLogger(ChatController.class);
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