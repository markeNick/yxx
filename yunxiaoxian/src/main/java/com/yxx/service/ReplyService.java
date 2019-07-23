package com.yxx.service;


import com.yxx.pojo.Reply;

import java.util.List;

public interface ReplyService {
    //查询单个留言详细信息(属于该留言的所有对话)
    public List<Reply> selectDetailForOneReply(String messageNumber, Integer currentPage);
}
