package com.yxx.service;

import com.yxx.pojo.GoodsCustom;

import java.util.List;

public interface CollectionService {

    /**
     * 根据openID查询用户的收藏物品
     * @param openID
     * @return
     */
    public List<GoodsCustom> selectUserCollerction(String openID, Integer currentPage);

    /**
     *
     * @param openID
     * @param goodsID
     * @return
     */
    public int insertUserCollection(String openID, Integer goodsID);
}
