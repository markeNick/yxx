package com.yxx.dao;

import com.yxx.pojo.Message;
import com.yxx.pojo.MessageCustom;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MessageMapper {
    //查询买家留言
    public List<MessageCustom> selectAllMyMessage(@Param("openID") String openID, @Param("currentPage") Integer currentPage);
    //查询用户留言框分别对应的回复数量
    public List<Integer> selectOneMessageNumberForReplyCount(List<String> messageNumberList);
}
