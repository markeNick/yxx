package com.yxx.dao;

import com.yxx.pojo.Reply;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ReplyMapper {
    //查询单个留言详细信息(属于该留言的所有对话)
    public List<Reply> selectDetailForOneReply(@Param("messageNumber")String messageNumber,@Param("currentPage")Integer currentPage);
}
