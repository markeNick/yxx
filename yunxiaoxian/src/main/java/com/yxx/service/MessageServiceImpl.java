package com.yxx.service;

import com.yxx.dao.MessageMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageMapper messageMapper;
}
