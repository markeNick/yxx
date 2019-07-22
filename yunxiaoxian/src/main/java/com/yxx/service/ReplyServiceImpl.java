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
    public List<Reply> selectDetailForOneReply(String messageNumber,Integer currentPage) {
        return replyMapper.selectDetailForOneReply(messageNumber,currentPage);
    }
}
