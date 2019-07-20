package com.yxx.dao;

import com.yxx.pojo.Goods;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GoodsMapper {
    //搜索框 根据商品描述查询商品信息(分页)
    public List<Goods> selectGoodsByGoodsDescribe(Goods goods);
}
