package com.yxx.service;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.Chat;
import org.springframework.web.socket.WebSocketSession;


public interface ChatService {

    /**
     * 查看是否有离线消息---有则发送
     */
    public void offLineMessage(String openID, WebSocketSession session);

    /**
     * 获取聊天列表
     * @param openID
     * @param currentPage
     * @return
     */
    public JSONObject getChatList(String openID, Integer currentPage);

    /**
     * 删除聊天列表
     * @param A_openID
     * @param B_openID
     * @return
     */
    public JSONObject deleteChatList(String A_openID, String B_openID);

    /**
     * 保存聊天记录
     * @param chat
     */
    public void insertChatMessage(Chat chat);
}