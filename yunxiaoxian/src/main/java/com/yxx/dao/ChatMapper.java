package com.yxx.dao;

import com.yxx.pojo.Chat;
import com.yxx.pojo.ChatList;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ChatMapper {

    /**
     * 查找离线聊天信息
     * @param openID
     * @return
     */
    public List<Chat> selectChatMessage(@Param("openID")String openID);

    /**
     * 删除离线聊天信息
     * @param openID
     */
    public void deleteChatMessage(@Param("openID")String openID);

    /**
     * 获取聊天列表
     * @param openID
     * @return
     */
    public List<ChatList> getChatList(@Param("openID")String openID,
                                      @Param("currentPage")Integer currentPage);

    /**
     * 删除聊天列表
     * @param A_openID   //本人的openID
     * @param B_openID   //对方的openID
     */
    public void deleteChatList(@Param("A_openID")String A_openID,
                               @Param("B_openID")String B_openID);

    /**
     * 保存聊天记录
     * @param chat
     */
    public void insertChatMessage(Chat chat);
}