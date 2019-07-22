package com.yxx.dao;

import com.yxx.pojo.GoodsCustom;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CollectionMapper {

    /**
     * 根据用户的openID查询其所收藏的物品信息
     * @param openID
     * @param currentPage
     * @return
     */
    public List<GoodsCustom> selectUserCollectionByOpenID(@Param("openID")String openID,
                                                          @Param("currentPage")Integer currentPage);
}
