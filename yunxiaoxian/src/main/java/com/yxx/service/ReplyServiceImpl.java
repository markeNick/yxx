package com.yxx.service;

import com.yxx.dao.ReplyMapper;
import com.yxx.pojo.Reply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ReplyServiceImpl implements ReplyService{
    @Autowired
    private ReplyMapper replyMapper;


    @Override
    public List<Reply> selectDetailForOneReply(String openID, Integer goodsId,String messageNumber,Integer currentPage) {
        return replyMapper.selectDetailForOneReply(openID,goodsId,messageNumber,currentPage);
    }

    @Override
    public Reply selectSpeakerAndListenerByMessageNumber(String messageNumber) {
        return replyMapper.selectSpeakerAndListenerByMessageNumber(messageNumber);
    }

    @Override
    public int insertReplyToReply(Reply reply) {
        return replyMapper.insertReplyToReply(reply);
    }

    @Override
    public List<Reply> selectReplyDetailByMessageNumber(String messageNumber) {
        return replyMapper.selectReplyDetailByMessageNumber(messageNumber);
    }
}
