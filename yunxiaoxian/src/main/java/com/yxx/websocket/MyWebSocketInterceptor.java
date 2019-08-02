package com.yxx.websocket;


import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

/**
 * 创建握手
 * 此类用来获取登录用户信息并交由websocket管理
 */
public class MyWebSocketInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) throws Exception {
        // 将ServerHttpRequest转换成request请求相关的类，用来获取request域中的用户信息
        if (request instanceof ServletServerHttpRequest) {
            ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
            HttpSession session = servletRequest.getServletRequest().getSession(true);
            if(session != null) {
                String openID = (String) session.getAttribute("openID");//获取名为openID的session
                if(openID == null) {
                    openID = "未知" + session.getId();
                }
                //将用户标识放入参数列表后，下一步的websocket处理器可以读取这里面的数据
                attributes.put("openID", openID);
                System.out.println(openID + "成功连接");
                System.out.println(session.getAttribute("openID") + "这是拦截器的");
            }

        }

        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest arg0, ServerHttpResponse arg1, WebSocketHandler arg2, Exception arg3) {
        // TODO Auto-generated method stub

    }

}