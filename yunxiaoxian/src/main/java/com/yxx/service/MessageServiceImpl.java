package com.yxx.service;

import com.yxx.dao.MessageMapper;
import com.yxx.pojo.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageMapper messageMapper;

    @Override
    public List<Message> selectMyMessage(String openID, Integer currentPage) {
        return messageMapper.selectMyMessage(openID,currentPage);
    }
}
