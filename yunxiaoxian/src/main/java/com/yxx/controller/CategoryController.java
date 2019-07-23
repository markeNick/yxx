package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.Category;
import com.yxx.service.CategoryService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CategoryController {
    private Logger logger = Logger.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;

    @GetMapping("getAllCategory")
    @ResponseBody
    public JSONObject getAllCategory(){
        JSONObject json = new JSONObject();
        List<Category> categoryList = new ArrayList<Category>();

        categoryList = categoryService.getAllCategory();
        json.put("categoryList", categoryList);

        return json;
    }

}