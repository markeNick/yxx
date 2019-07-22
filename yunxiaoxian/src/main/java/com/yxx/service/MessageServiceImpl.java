package com.yxx.service;

import com.yxx.dao.MessageMapper;
import com.yxx.pojo.Message;
import com.yxx.pojo.MessageCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageMapper messageMapper;

    @Override
    public List<MessageCustom> selectAllMyMessage(String openID, Integer currentPage) {
        return messageMapper.selectAllMyMessage(openID,currentPage);
    }

    @Override
    public List<Integer> selectOneMessageNumberForReplyCount(List<String> messageNumberList) {
        return messageMapper.selectOneMessageNumberForReplyCount(messageNumberList);
    }
}
