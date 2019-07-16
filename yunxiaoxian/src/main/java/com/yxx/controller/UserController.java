package com.yxx.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.xml.ws.RequestWrapper;

@Controller
public class UserController {

    @RequestMapping(value = "/test")
    public String test(){
        return "index";
    }
}
