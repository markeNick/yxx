package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.Goods;
import com.yxx.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.util.List;

@Controller
public class GoodsController {
    @Autowired
    private GoodsService goodsService;

    //搜索框   根据商品描述和页码模糊查询商品信息
    @GetMapping("selectGoodsByGoodsDescribe")
    @ResponseBody
    public JSONObject selectGoodsByGoodsDescribe(@ModelAttribute("goods")Goods goods,String goodsDescribe) throws UnsupportedEncodingException {
        if(goodsDescribe!=null){//解决搜索信息中文乱码
            goods.setGoodsDescribe(new String(goodsDescribe.getBytes("ISO-8859-1"),"UTF-8"));
            System.out.println(goods.getGoodsDescribe()+"描述===============");
        }
        JSONObject json=new JSONObject();
        List<Goods> goodslist=null;
        try {
            goodslist=goodsService.selectGoodsByGoodsDescribe(goods);
        }catch(Exception e){
            e.printStackTrace();
        }
            for (Goods g:goodslist){
                System.out.println(g.toString()+"第二条===============");
            }

            json.put("goodslist",goodslist);
            json.put("page",1);
            //String json=json.toJSONString();
            return json;


    }
}
