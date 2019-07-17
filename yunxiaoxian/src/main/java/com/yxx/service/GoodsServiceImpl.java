package com.yxx.service;

import com.yxx.dao.GoodsMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class GoodsServiceImpl implements GoodsService {
    @Autowired
    private GoodsMapper goodsMapper;
}
