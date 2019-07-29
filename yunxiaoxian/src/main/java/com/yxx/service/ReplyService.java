package com.yxx.service;


import com.yxx.pojo.Reply;

import java.util.List;

public interface ReplyService {
    //查询单个留言详细信息(属于该留言的所有对话)
    public List<Reply> selectDetailForOneReply(String openID,Integer goodsId,String messageNumber,Integer currentPage);
    //根据messageNumber查询reply表中时间最早的一条记录
    public Reply selectSpeakerAndListenerByMessageNumber(String messageNumber);
    //插入reply表
    public int insertReplyToReply(Reply reply);
    //查询用户留言框编号查询对应所有回复信息
    public List<Reply> selectReplyDetailByMessageNumber(String messageNumber);
}
