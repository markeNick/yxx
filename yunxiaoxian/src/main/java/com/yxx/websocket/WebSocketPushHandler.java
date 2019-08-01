package com.yxx.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yxx.dao.ChatMapper;
import com.yxx.pojo.Chat;
import com.yxx.service.ChatService;
import org.apache.log4j.Logger;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;
import javax.annotation.Resource;


/**
 * 处理器
 */
public class WebSocketPushHandler extends AbstractWebSocketHandler {

    private static final Logger logger = Logger.getLogger(WebSocketPushHandler.class);

    @Resource
    private ChatService chatService;

    private static final List<WebSocketSession> users = new ArrayList<>();

    //存储WebsocketSession
    private static final ConcurrentHashMap<String, WebSocketSession> mapUserSession = new ConcurrentHashMap<String, WebSocketSession>(1024);


    // 建立websocket连接时调用该方法
    // 用户进入系统监听
    // 用户连接上websocket后发送离线消息
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //获取当前用户的session
        String openID = this.getUserSession(session);
        if(openID != null) {
            mapUserSession.put(openID, session);

            System.out.println(mapUserSession.toString());

            chatService.offLineMessage(openID, session);
        } else {
            session.sendMessage(new TextMessage("{'error': 'the session of openID is null'}"));
        }

    }


    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        // 将消息进行转化，因为是消息是json数据，可能里面包含了发送给某个人的信息，所以需要用json相关的工具类处理之后再封装成TextMessage，
        // 我这儿并没有做处理，消息的封装格式一般有{from:xxxx,to:xxxxx,msg:xxxxx}，来自哪里，发送给谁，什么消息等等
        // TextMessage msg = (TextMessage)message.getPayload();
        // 给所有用户群发消息
        //sendMessagesToUsers(msg);
        // 给指定用户群发消息
        //sendMessageToUser(userId, msg);
        String msg = message.getPayload().toString();
        System.out.println(msg);
        JSONObject json = JSON.parseObject(msg);



        System.out.println(json.getString("status"));
        System.out.println(json.getString("chatType"));
        System.out.println(json.getString("chatList"));
        System.out.println(json.getString("aopenID"));
        System.out.println(json.getString("content"));
        System.out.println(json.getString("chatList[0]"));

        session.sendMessage(new TextMessage("gaga"));


        //1.获取用户传过来的信息

    }

    // 后台错误信息处理方法
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        if (session.isOpen()) {
            session.close();
        }
        System.out.println("---------------------------------------------");
        System.out.println(session.getAttributes().get("openID"));
        mapUserSession.remove(session.getAttributes().get("openID"));
        System.out.println(mapUserSession.toString());
        System.out.println("---------------------------------------------");
    }

    // 用户退出后的处理，不如退出之后，要将用户信息从websocket的session中remove掉，这样用户就处于离线状态了，也不会占用系统资源
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        if (session.isOpen()) {
            session.close();
        }
        users.remove(session);

        String openID = (String) session.getAttributes().get("openID");
        mapUserSession.remove(openID);
        System.out.println(openID + "安全退出了系统");

    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    /**
     * 给所有的用户发送消息
     */
    public void sendMessagesToUsers(TextMessage message) {
        for (WebSocketSession user : users) {
            try {
                // isOpen()在线就发送
                if (user.isOpen()) {
                    user.sendMessage(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 发送消息给指定的用户
     */
    public void sendMessageToUser(String userId, TextMessage message) {



        for (WebSocketSession user : users) {
            if (user.getAttributes().get("").equals(userId)) {
                try {
                    // isOpen()在线就发送
                    if (user.isOpen()) {
                        user.sendMessage(message);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 获取当前用户session
     * @param session
     * @return
     */
    private String getUserSession(WebSocketSession session){
        try {
            String openID = (String) session.getAttributes().get("openID");
            return openID;
        } catch (Exception e){
            logger.error("error by getUserSession:{}", e);
        }
        return null;
    }

    //查看是否有离线消息---有则发送
//    private void offLineMessage(String openID, WebSocketSession session) {
//        JSONObject json = new JSONObject();
//
//        List<Chat> chatList = null;
//        chatList = chatMapper.selectChatMessage(openID);
//
//        json.put("chatType", "offline");
//        json.put("chatList", chatList);
//
//        TextMessage message = new TextMessage(json.toJSONString());
//
//        if (chatList != null && chatList.size() != 0){
//            try {
//                System.out.println("离线消息为：" + json.toJSONString());
//                session.sendMessage(message);
//            } catch (IOException e){
//                logger.error("off-LineMessage error:{}", e);
//            }
//        }
//    }

    /**
     * 发送消息给指定的用户
     */
    public void sendmsg(String AopenID, String BopenID, String message) {

        System.out.println("==================================================");
        System.out.println(mapUserSession.get(AopenID));
        System.out.println(mapUserSession.get(BopenID));
        System.out.println(message);
        System.out.println("服务器接收到信息，并成功转发");
        WebSocketSession session = mapUserSession.get(AopenID);
        System.out.println(session.toString());
        JSONObject json = new JSONObject();
        json.put("status", true);
        json.put("chatType", "off-line");

        TextMessage msg = new TextMessage(json.toJSONString());
        //ChatMapper cm = JSON.parseObject(msg, ChatMessage.class);

        try {
            System.out.println(json.toJSONString());
            session.sendMessage(msg);
        } catch (IOException e) {
            logger.error("error:{}", e);
        }

    }


//    public static void main(String[] args) {
//        JSONObject json = new JSONObject();
//        json.put("test","haha");
//        List<Chat> chatList = new ArrayList<Chat>();
//        Chat c1 = new Chat();
//        Chat c2 = new Chat();
//
//        c1.setAOpenID("a1");
//        c1.setBOpenID("b1");
//        c2.setAOpenID("a2");
//
//        chatList.add(c1);
//        chatList.add(c2);
//
//        json.put("chatList", chatList);
//        System.out.println(json.toJSONString());
//        System.out.println("=================");
//        System.out.println(json.toString());
//    }
}