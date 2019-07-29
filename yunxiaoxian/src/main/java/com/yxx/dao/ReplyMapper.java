package com.yxx.dao;

import com.yxx.pojo.Reply;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ReplyMapper {
    //查询单个留言详细信息(属于该留言的所有对话)
    public List<Reply> selectDetailForOneReply(@Param("openID")String openID,@Param("goodsId")Integer goodsId,@Param("messageNumber")String messageNumber,@Param("currentPage")Integer currentPage);
    //根据messageNumber查询reply表中时间最早的一条记录
    public Reply selectSpeakerAndListenerByMessageNumber(@Param("messageNumber")String messageNumber);
    //插入reply表
    public int insertReplyToReply(Reply reply);
    //查询用户留言框编号查询对应所有回复信息
    public List<Reply> selectReplyDetailByMessageNumber(@Param("messageNumber")String messageNumber);

}
