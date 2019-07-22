package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.User;
import com.yxx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    //最新商品分类
    @PostMapping("updateUser")
    @ResponseBody
    public JSONObject updateUser(@ModelAttribute("user")User user){
        JSONObject json = new JSONObject();

        User userTemp = userService.selectUserByOpenID(user.getOpenID());

        if(userTemp != null){   //如果该用户存在，则更新用户信息
            if(userService.updateUser(user) == 1){   //如果更新成功，返回true，否则返回false
                System.out.println("=====================>" + userService.updateUser(user));
                json.put("status", "true");
                return json;
            }
            json.put("status", "false");
            return json;
        }

        //如果用户不存在，则注册用户
        if(userService.registerUser(user) == 1){     //如果注册成功，返回true，否则返回false
            json.put("status", "true");
            return json;
        }
        json.put("status", "false");
        return json;
    }
}
