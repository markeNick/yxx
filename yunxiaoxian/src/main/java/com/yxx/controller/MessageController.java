package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.Message;
import com.yxx.pojo.MessageCustom;
import com.yxx.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    @PostMapping("/selectAllMyMessage")
    @ResponseBody
    public JSONObject selectAllMyMessage(String openID,Integer currentPage){
        Logger logger = LoggerFactory.getLogger(MessageController.class);
        JSONObject json=new JSONObject();
        List<String> messageNumberList=new ArrayList<String>();//存留言框编号集合
        List<MessageCustom> messagelist=null;
        try {
            if(currentPage != null && openID != null){//openID和页码不为空
                messagelist = messageService.selectAllMyMessage(openID,(currentPage-1)*10);//查询所有留言
                if(messagelist.size() > 0) {//假如能查到
                    int size = messagelist.size();//存集合长度
                    for(MessageCustom messageCustom:messagelist){
                        messageNumberList.add(messageCustom.getMessageNumber());//存留言框编号
                    }
                    List<Integer> messages = messageService.selectOneMessageNumberForReplyCount(messageNumberList);
                    for(int i = 0; i < size; i++){//将回复别存进每个MessageCustom
                        messagelist.get(i).setCount(messages.get(i));
                    }
                }
            } else if (currentPage == null && openID != null){//openID不为空和页码为空
                messagelist = messageService.selectAllMyMessage(openID, 0);
                if(messagelist.size() > 0){//假如能查到
                    int size=messagelist.size();//存集合长度
                    for(MessageCustom messageCustom:messagelist){
                        messageNumberList.add(messageCustom.getMessageNumber());//存留言框编号
                    }
                    List<Integer> messages = messageService.selectOneMessageNumberForReplyCount(messageNumberList);
                    for(int i = 0; i < size; i++){//将回复数分别存进每个MessageCustom
                        messagelist.get(i).setCount(messages.get(i));
                    }
                }
            } else {//openID为空
                json.put("messagelist", new ArrayList<String>());
                return json;
            }
        }catch (Exception e){
            logger.error("error:", e);
        }
        json.put("messagelist", messagelist);
        return json;
    }

    //查看留言详细记录
    @PostMapping("/selectDetailForReply")
    @ResponseBody
    public JSONObject selectDetailForReply(){
        Logger logger = LoggerFactory.getLogger(MessageController.class);
        JSONObject json=new JSONObject();
        return json;
    }
}
