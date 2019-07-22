package com.yxx.service;

import com.yxx.dao.ReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class ReplyServiceImpl implements ReplyService{
    @Autowired
    private ReplyMapper replyMapper;
}
