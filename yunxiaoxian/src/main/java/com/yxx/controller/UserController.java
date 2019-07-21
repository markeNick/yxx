package com.yxx.controller;

import com.yxx.pojo.User;
import com.yxx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.xml.ws.RequestWrapper;
import java.util.List;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/test")
    public String test(){
        return "index";
    }
    @RequestMapping(value = "/selectAllUser")
    @ResponseBody
    public List<User> selectAllUser(){
        List<User> userslist = userService.selectAllFormUser();
        return userslist;
    }
}
