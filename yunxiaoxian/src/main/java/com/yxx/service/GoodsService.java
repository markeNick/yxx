package com.yxx.service;

import com.yxx.pojo.Goods;

import java.util.List;

public interface GoodsService {
    //搜索框 根据商品描述查询商品信息(分页)
    public List<Goods> selectGoodsByGoodsDescribe(Goods goods);
}
