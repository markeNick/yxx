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

    @PostMapping("updateUser")
    @ResponseBody
    public JSONObject updateUser(@RequestParam("openID")String openID,
                                 @RequestParam("userName")String userName,
                                 @RequestParam("userImage")String userImage){

        JSONObject json = new JSONObject();

        User user = new User();
        user.setOpenID(openID);
        user.setUserImage(userImage);
        user.setUserName(userName);

        User temp = userService.selectUserByOpenID(openID);

        //如果user用户存在,则更新用户信息
        if(temp != null){
            if(userService.updateUser(user) == 1){  //如果更新成功返回true，否则返回false
                System.out.println("更新");
                json.put("status", "true");
                return json;
            }
            json.put("status", "false");
            return json;
        }
        //如果user用户不存在,则注册用户
        if(userService.registerUser(user) == 1){    //如果注册成功返回true，否则返回false
            System.out.println("注册");
            json.put("status", "true");
            return json;
        }
        json.put("status", "true");
        return json;

    }


}
