package com.yxx.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yxx.dao.ChatMapper;
import com.yxx.pojo.Chat;
import com.yxx.pojo.ChatList;
import com.yxx.service.ChatService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;


@Service
public class ChatServiceImpl implements ChatService {
    Logger logger = Logger.getLogger(ChatServiceImpl.class);

    @Autowired
    private ChatMapper chatMapper;

    @Override
    public void offLineMessage(String openID, WebSocketSession session) {
        JSONObject json = new JSONObject();

        //查询离线消息
        List<Chat> chatList = chatMapper.selectChatMessage(openID);

        json.put("chatType", "offline");
        json.put("chatList", chatList);

        TextMessage message = new TextMessage(json.toJSONString());

        //发送信息
        if (chatList != null && chatList.size() != 0){
            try {
                session.sendMessage(message);
            } catch (IOException e){
                logger.error("off-LineMessage error:{}", e);
                return;
            }
            //删除信息
            try {
                chatMapper.deleteChatMessage(openID);
            } catch (Exception e) {
                logger.error("off-LineMessage error:{}", e);
            }
        }
    }

    @Override
    public JSONObject getChatList(String openID, Integer currentPage) {
        JSONObject json = new JSONObject();
        List<ChatList> chatList = null;
        try {
            chatList = chatMapper.getChatList(openID, currentPage);
        } catch (Exception e){
            logger.debug("getChatList error:{}", e);
        }
        json.put("chatList", chatList);
        return json;
    }

    @Override
    public JSONObject deleteChatList(String A_openID, String B_openID) {
        JSONObject json = new JSONObject();
        try {
            chatMapper.deleteChatList(A_openID, B_openID);
            json.put("status", true);
            return json;
        } catch (Exception e){
            logger.error("deleteChatList error:{}", e);
        }

        json.put("status", false);
        return json;
    }
}