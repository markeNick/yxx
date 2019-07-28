package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.Message;
import com.yxx.pojo.MessageCustom;
import com.yxx.pojo.Reply;
import com.yxx.service.MessageService;
import com.yxx.service.ReplyService;
import com.yxx.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
public class MessageController {
    private static Logger logger = LoggerFactory.getLogger(MessageController.class);
    @Autowired
    private MessageService messageService;
    @Autowired
    private ReplyService replyService;
    @Autowired
    private UserService userService;

    //查询买家留言
    @PostMapping("/selectAllMyMessage")
    @ResponseBody
    public JSONObject selectAllMyMessage(String openID,String userName,Integer currentPage) throws UnsupportedEncodingException {
        JSONObject json=new JSONObject();
        List<String> messageNumberList=new ArrayList<String>();//存留言框编号集合
        List<MessageCustom> messagelist=null;//存所有信息集合
        List<Integer> messages=null;//存每个编号框对应的回复数
            if(currentPage!=null&&openID!=null&&userName!=null){//openID和页码不为空
                try {
                    messagelist = messageService.selectAllMyMessage(openID,userName,(currentPage-1)*10);//查询所有留言
                }catch (Exception e){
                    logger.error("selectAllMyMessage--> error:{}",e);
                }
                if(messagelist.size()>0){//假如能查到
                    int size=messagelist.size();//存集合长度
                    for(MessageCustom messageCustom:messagelist){
                        messageNumberList.add(messageCustom.getMessageNumber());//存留言框编号
                    }
                    for(int len=0;len<size;len++){
                        //查询每个编号框对应的回复数
                        Integer messageCount=messageService.selectOneMessageNumberForReplyCount(messageNumberList.get(len));
                        messagelist.get(len).setCount(messageCount);//将回复数分别存进每个MessageCustom
                    }
                }
            }else if(currentPage==null&&openID!=null&&userName!=null){//openID不为空和页码为空
                try {
                    messagelist = messageService.selectAllMyMessage(openID,userName,0);//查询所有留言
                }catch (Exception e){
                    logger.error("selectAllMyMessage--> error:{}",e);
                }
                if(messagelist.size()>0){//假如能查到
                    int size=messagelist.size();//存集合长度
                    for(MessageCustom messageCustom:messagelist){
                        messageNumberList.add(messageCustom.getMessageNumber());//存留言框编号
                    }
                    for(int len=0;len<size;len++){
                       //查询每个编号框对应的回复数
                       Integer messageCount=messageService.selectOneMessageNumberForReplyCount(messageNumberList.get(len));
                       messagelist.get(len).setCount(messageCount);//将回复数分别存进每个MessageCustom
                    }
                }
            }
            else {//openID为空
                json.put("messagelist",null);
                return json;
            }
        json.put("messagelist",messagelist);
        return json;
    }

    //查看留言详细记录
    @PostMapping("/selectDetailForReply")
    @ResponseBody
    public JSONObject selectDetailForReply(@RequestParam("openID") String openID,
                                           @RequestParam("goodsId")Integer goodsId,
                                           @RequestParam("messageNumber")String messageNumber,
                                           Integer currentPage){
        
        JSONObject json=new JSONObject();
        List<Reply> replylist=null;

        if(currentPage!=null){//openID
            try {
                replylist = replyService.selectDetailForOneReply(openID,goodsId,messageNumber,(currentPage-1)*10);//查询回复信息
            }catch (Exception e){
                logger.error("selectDetailForOneReply--> error:{}",e);
            }
        }else if(currentPage==null){//openID
            try {
                replylist = replyService.selectDetailForOneReply(openID,goodsId,messageNumber,0);//查询回复信息
            }catch (Exception e){
                logger.error("selectDetailForOneReply--> error:{}",e);
            }
        }
        if(replylist!=null&&replylist.size()>0){
            json.put("replylist",replylist);
        }else {
            json.put("replylist",null);
        }
        return json;
    }

    //留言
    @PostMapping("/doMessage")
    @ResponseBody
    public JSONObject doMessage(@ModelAttribute("messageCustom")MessageCustom messageCustom,
                                @ModelAttribute("reply")Reply reply,@ModelAttribute("messages")Message messages,
                                Integer goodsId, String openID,String message) throws ParseException {
        
        JSONObject json=new JSONObject();
        if(openID!=null&&goodsId!=null&&message!=null&&
                messageCustom.getUserName()!=null&&messageCustom.getUserImage()!=null){
            UUID randomUUID = UUID.randomUUID();
            //查询是否留言过(根据goods_id和买家openID查询是否存在留言框编号)
            String messageNumber=null;//留言框编号
            try {
                messageNumber=messageService.selectMessageNumberByGoodsIDAndOpenID(goodsId,openID);
            }catch (Exception e){
                logger.error("selectMessageNumberByGoodsIDAndOpenID--> error:{}",e);
            }
            if(messageNumber==null||messageNumber.equals("")){//假如第一次留言
                int i=0;
                int j=0;
                String firstMessageNumber=randomUUID.toString()+System.currentTimeMillis();//第一个留言框编号=随机数+时间戳
                String dateString =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());//获取时间
                messages.setMessageNumber(firstMessageNumber);
                messages.setCreateTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dateString));//设置时间
                try {//假如第一次留言
                    i = messageService.insertMessageByMessage(messages);//插入message表 给买家存一条记录索引
                    if(i>0){
                        messages.setOpenID(userService.selectUserByGoodsId(goodsId).getOpenID());//插入message表
                        i=messageService.insertMessageByMessage(messages);//给买家存一条记录索引
                    }
                    //插入message表 给买家存一条记录索引
                }catch (Exception e){
                    logger.error("selectUserByGoodsId,insertMessageByMessage--> error:{}",e);
                }
                if(i>0){
                    reply.setCreateTime(messages.getCreateTime());
                    reply.setMessageNumber(firstMessageNumber);
                    reply.setSpeaker(messageCustom.getUserName());//留言者name
                    reply.setSpeakerImage(messageCustom.getUserImage());
                    reply.setBuyer(openID);
                    reply.setSeller(userService.selectUserByGoodsId(goodsId).getOpenID());
                    reply.setListener(userService.selectUserByGoodsId(goodsId).getUserName());//卖家名
                    try {
                        j=replyService.insertReplyToReply(reply);
                    }catch (Exception e){
                        logger.error("selectUserByGoodsId--> error:{}",e);
                    }
                }
                if(j>0){//留言成功
                    json.put("status",true);
                }else {//留言失败
                    json.put("status",false);
                }
            }else { //假如留言过就转回复 messageNumber goods_id message userName userImage 买家openID
                String dateString =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());//获取时间
                reply.setCreateTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dateString));//设置时间
                reply.setMessageNumber(messageNumber);
                reply.setSpeaker(messageCustom.getUserName());//留言者name
                reply.setSpeakerImage(messageCustom.getUserImage());
                reply.setSeller(userService.selectUserByGoodsId(goodsId).getOpenID());
                //查询reply表中的说话者和听话者
                Reply replyPackage=replyService.selectSpeakerAndListenerByMessageNumber(messageNumber);
                if(messageCustom.getUserName().equals(replyPackage.getSpeaker())){//判断谁是说话者,谁是听话者
                    reply.setListener(replyPackage.getListener());//卖家名
                    reply.setBuyer(replyPackage.getBuyer());//买家openID
                }else{
                    reply.setListener(replyPackage.getSpeaker());//卖家名
                    reply.setBuyer(replyPackage.getBuyer());//买家openID
                }
                int k=replyService.insertReplyToReply(reply);//插入reply表
                if(k>0){//回复成功
                    json.put("status",true);
                }else {
                    json.put("status",false);
                }
            }
        }else{
            json.put("status",false);
        }


        return json;
    }
}
