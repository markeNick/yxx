package com.yxx.dao;

import com.yxx.pojo.Goods;
import com.yxx.pojo.GoodsCustom;

import java.util.List;

public interface GoodsMapper {
    //搜索框 根据商品描述查询商品信息(分页)
    public List<GoodsCustom> selectGoodsByGoodsDescribe(Goods goods);
    //搜索框 根据商品描述或类型查询相应商品在商品表的记录数
    public int selectCountByGoods(Goods goods);
    //查询单个商品的详细信息
    public Goods selectOneGoodsByGoodsId(Goods goods);
}
