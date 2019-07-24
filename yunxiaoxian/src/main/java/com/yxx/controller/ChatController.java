package com.yxx.controller;


import com.yxx.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;



}