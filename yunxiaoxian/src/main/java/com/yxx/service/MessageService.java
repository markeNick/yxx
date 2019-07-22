package com.yxx.service;

import com.yxx.pojo.Message;

import java.util.List;

public interface MessageService {
    //查询买家留言
    public List<Message> selectMyMessage(String openID,Integer currentPage);
}
