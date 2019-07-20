package com.yxx.service;

import com.yxx.dao.GoodsMapper;
import com.yxx.pojo.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsServiceImpl implements GoodsService {
    @Autowired
    private GoodsMapper goodsMapper;

    @Override
    public List<Goods> selectGoodsByGoodsDescribe(Goods goods) {
        return goodsMapper.selectGoodsByGoodsDescribe(goods);
    }
}
