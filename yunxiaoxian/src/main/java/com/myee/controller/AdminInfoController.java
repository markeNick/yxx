package com.myee.controller;

import com.myee.dao.AdminInfoMapper;
import com.myee.pojo.AdminInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class AdminInfoController {
    @Autowired
    private AdminInfoMapper adminInfoMapper;

    //返回所有admin信息页面
    @RequestMapping("/showAllAdmin")
    public String showAllAdmin(Model model){
        List<AdminInfo> adminInfos = adminInfoMapper.selectAllAdmin();
        System.out.println(adminInfos.toString());
        model.addAttribute("adminInfos",adminInfos);
        int a=1;
        return "showAll";
    }
}
