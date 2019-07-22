package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.User;
import com.yxx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
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

<<<<<<< HEAD
    //发布商品
/*    @RequestMapping(value = "/publishMyGoods")
=======
    //查询我卖的商品
    @PostMapping("updateUser")
>>>>>>> feature
    @ResponseBody
    public JSONObject updateUser(@ModelAttribute("user")User user){
        JSONObject json = new JSONObject();
        User temp = userService.selectUserByOpenID(user.getOpenID());

        //如果user用户存在,则更新用户信息
        if(temp != null){
            if(userService.updateUser(user) == 1){  //如果更新成功返回true，否则返回false
                json.put("status", "true");
                return json;
            }
            json.put("status", "false");
            return json;
        }

        //如果user用户不存在,则注册用户
        if(userService.registerUser(user) == 1){    //如果注册成功返回true，否则返回false
            json.put("status", "true");
            return json;
        }
<<<<<<< HEAD
    }*/
=======
        json.put("status", "false");
        return json;
    }
>>>>>>> feature
}
