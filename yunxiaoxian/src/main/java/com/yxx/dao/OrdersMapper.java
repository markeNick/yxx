package com.yxx.dao;

import org.apache.ibatis.annotations.Param;

public interface OrdersMapper {

    /**
     * 修改订单表用户的状态---“删除订单”
     * @param buyerOpenID
     * @param goodsID
     * @return
     */
    public int updateOrderOfUserStatus(@Param("buyerOpenID")String buyerOpenID,
                                       @Param("sellerOpenID")String sellerOpenID,
                                       @Param("goodsID")Integer goodsID);
}
