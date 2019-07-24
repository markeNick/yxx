package com.yxx.service;

import com.yxx.dao.GoodsMapper;
import com.yxx.pojo.Goods;
import com.yxx.pojo.GoodsCustom;
import com.yxx.pojo.OrderCustom;
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
    public GoodsCustom selectOneGoodsByGoodsId(Goods goods) {
        return goodsMapper.selectOneGoodsByGoodsId(goods);
    }

    @Override
    public List<OrderCustom> selectAllMySaleGoods(String openID,Integer currentPage) {
        return goodsMapper.selectAllMySaleGoods(openID,currentPage);
    }

    @Override
    public List<OrderCustom> selectAllMyBuyGoods(String openID, Integer currentPage) {
        return goodsMapper.selectAllMyBuyGoods(openID,currentPage);
    }

    @Override
    public List<Goods> selectAllMyPublishGoods(String openID, Integer currentPage) {
        return goodsMapper.selectAllMyPublishGoods(openID,currentPage);
    }

    @Override
    public boolean uploadGoods(Goods goods){
        boolean flag = false;
        System.out.println("======================================================Name:"+goods.getGoodsName());
        System.out.println("======================================================Describe:"+goods.getGoodsDescribe());
        System.out.println("======================================================Image:"+goods.getGoodsImage());
        System.out.println("======================================================Price:"+goods.getGoodsPrice());
        System.out.println("======================================================CategoryId:"+goods.getCategoryId());
        System.out.println("======================================================Status:"+goods.getStatus());
        System.out.println("======================================================CreateTime:"+goods.getCreateTime());
        System.out.println("======================================================OpenID:"+goods.getOpenID());

        int temp = goodsMapper.uploadGoods(goods);
        if(temp==1){
            return !flag;
        }
        return flag;
    }
}
