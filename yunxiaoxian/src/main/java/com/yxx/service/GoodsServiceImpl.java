package com.yxx.service;

import com.yxx.dao.GoodsMapper;
import com.yxx.pojo.Goods;
import com.yxx.pojo.GoodsCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsServiceImpl implements GoodsService {
    @Autowired
    private GoodsMapper goodsMapper;

    @Override
    public List<GoodsCustom> selectGoodsByGoodsDescribe(Goods goods) {
        return goodsMapper.selectGoodsByGoodsDescribe(goods);
    }

    @Override
    public int selectCountByGoods(Goods goods) {
        return goodsMapper.selectCountByGoods(goods);
    }

    @Override
    public Goods selectOneGoodsByGoodsId(Goods goods) {
        return goodsMapper.selectOneGoodsByGoodsId(goods);
    }
}
