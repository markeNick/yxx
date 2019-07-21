package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.Goods;
import com.yxx.pojo.GoodsCustom;
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
    public JSONObject selectGoodsByGoodsDescribe(@ModelAttribute("goods")Goods goods,String goodsDescribe,Integer currentPage) throws UnsupportedEncodingException {
        if(goodsDescribe!=null){//解决搜索信息中文乱码
            goods.setGoodsDescribe(new String(goodsDescribe.getBytes("ISO-8859-1"),"UTF-8"));
        }
        JSONObject json=new JSONObject();
        List<GoodsCustom> goodslist=null;//商品信息集合
        Integer maxpage=null;//最大页数
        Integer count=null;//总记录数
        try {
            if(currentPage!=null){//假如发送了页码,返回后续页的数据
                goods.setCurrentPage((currentPage-1)*10);
                goodslist=goodsService.selectGoodsByGoodsDescribe(goods);//查询相应所有商品信息
            }else{//假如没发送页码,返回第一页的数据
                goods.setCurrentPage(0);
                goodslist=goodsService.selectGoodsByGoodsDescribe(goods);//查询相应所有商品信息
            }
            count= goodsService.selectCountByGoods(goods);//查询相应所有商品信息总记录数
        }catch(Exception e){
            e.printStackTrace();
        }
        if(count!=null){
            if(count/10==0&&count%10>0){//1-9条记录数
                maxpage=1;
            }else if(count/10>0&&count%10>0){//不能被10整除的记录数
                maxpage=(count/10)+1;
            }else if(count/10>0&&count%10==0) {//能被10整除的记录数
                maxpage=count/10;
            }
        } else{//0条记录数
            maxpage=0;
        }
        if(goodslist!=null&&goodslist.size()!=0&&maxpage!=0){//假如查询到信息,返回
            json.put("goodslist",goodslist);//商品信息
            json.put("maxpage",maxpage);//最大页数
            json.put("count",count);//总纪录数
        }else {//没查询到,返回null
            json.put("goodslist",null);
        }
            return json;
    }
    //返回 单个商品详细信息
    @GetMapping("selectOneGoodsDetailMessage")
    @ResponseBody
    public JSONObject selectOneGoodsDetailMessage(@ModelAttribute("goods")Goods goods,Integer goodsId){
        Goods goodsmessage=null;
        JSONObject json=new JSONObject();
        if(goodsId!=null){//假如商品id不为null,查询商品信息
            try {
                goodsmessage = goodsService.selectOneGoodsByGoodsId(goods);
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        if(goodsmessage!=null){
            json.put("goodsmessage",goodsmessage);
            return json;
        }else {//假如没查到或者商品id为null,返回null
            json.put("goodsmessage",null);
            return json;
        }

    }
}
