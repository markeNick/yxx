package com.yxx.dao;

import com.yxx.pojo.Message;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MessageMapper {
    //查询买家留言
    public List<Message> selectMyMessage(@Param("openID") String openID,@Param("currentPage") Integer currentPage);
}
