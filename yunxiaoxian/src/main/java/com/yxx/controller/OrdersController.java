package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OrdersController {
    @Autowired
    private OrdersService ordersService;

    //拉黑
    @PostMapping("blacklist")
    @ResponseBody
    public boolean blacklist(String openID1, String openID2){
        System.out.println("================================================con"+openID1);
        System.out.println("================================================con"+openID2);
        if(ordersService.blacklist(openID1, openID2) == true){
            return true;
        }else {
            return false;
        }

    }
}
