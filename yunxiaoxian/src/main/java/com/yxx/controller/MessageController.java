package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.Message;
import com.yxx.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MessageController {
    @Autowired
    private MessageService messageService;

    //查询买家留言
    @PostMapping("/selectMyMessage")
    @ResponseBody
    public JSONObject selectMyMessage(String openID,Integer currentPage){
        JSONObject json=new JSONObject();
        List<Message> messagelist=null;
        try {
            if(currentPage!=null&&openID!=null){//openID和页码不为空
                messagelist = messageService.selectMyMessage(openID,(currentPage-1)*10);
            }else if(currentPage==null&&openID!=null){//openID不为空和页码为空
                messagelist = messageService.selectMyMessage(openID, 0);
            }
            else {//openID为空
                json.put("messagelist",new ArrayList<String>());
                return json;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        json.put("messagelist",messagelist);
        return json;
    }

}
