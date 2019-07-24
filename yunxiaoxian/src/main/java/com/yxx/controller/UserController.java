package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.GoodsCustom;
import com.yxx.pojo.MessageCustom;
import com.yxx.pojo.User;
import com.yxx.service.CollectionService;
import com.yxx.service.OrdersService;
import com.yxx.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@Controller
public class UserController {
    private Logger logger = Logger.getLogger(UserController.class);


    @Autowired
    private UserService userService;

    @Autowired
    private CollectionService collectionService;

    @Autowired
    public OrdersService ordersService;

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

    //修改用户或注册用户
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


    //卖家售出功能
    @PostMapping("soldMyGoods")
    @ResponseBody
    @Transactional
    public JSONObject soldMyGoods(String openID, Integer goodsID){
        JSONObject json = new JSONObject();

        try {
            if(userService.soldMyGoods(openID, goodsID) == 1){
                json.put("status", "true");
                return json;
            }
        } catch (Exception e) {
            logger.debug("soldMyGoods--> error:{}", e);
            throw new RuntimeException();
        }

        json.put("status", "false");
        return json;
    }

    //删除订单
    @PostMapping("deleteOrder")
    @ResponseBody
    @Transactional
    public JSONObject deleteOrder(String openID, Integer goodsID, Integer identity){
        JSONObject json = new JSONObject();

        return ordersService.deleteOrders(openID, identity, goodsID);
    }

}
