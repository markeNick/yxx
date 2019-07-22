package com.yxx.service;

import com.yxx.pojo.Message;
import com.yxx.pojo.MessageCustom;

import java.util.List;

public interface MessageService {
    //查询买家留言
    public List<MessageCustom> selectAllMyMessage(String openID, Integer currentPage);
    //查询用户留言框分别对应的回复数量
    public List<Integer> selectOneMessageNumberForReplyCount(List<String> messageNumberList);
}