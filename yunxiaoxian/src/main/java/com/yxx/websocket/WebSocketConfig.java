package com.yxx.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * 配置文件
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebMvcConfigurer,WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        //1.注册websocket
        String websocket_url = "/websocket";    //设置websocket的地址

        registry.addHandler(WebSocketPushHandler(), websocket_url).             //注册Handler
                addInterceptors(new MyWebSocketInterceptor()).setAllowedOrigins("*");   //注册Interceptors

        registry.addHandler(WebSocketPushHandler(), websocket_url)
                .addInterceptors(new MyWebSocketInterceptor()).withSockJS();
    }

    @Bean
    public WebSocketHandler WebSocketPushHandler() {
        return new WebSocketPushHandler();
    }

}

