package com.yxx.service;

import com.alibaba.fastjson.JSONObject;
import com.yxx.dao.OrdersMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OrdersServiceImpl implements OrdersService {
    private Logger logger = Logger.getLogger(OrdersServiceImpl.class);

    @Autowired
    private OrdersMapper ordersMapper;

    @Override
    public JSONObject deleteOrders(String openID, Integer identity, Integer goodsID) {
        JSONObject json = new JSONObject();

        if(identity == 0){  //如果是买家
            try {
                if(1 ==ordersMapper.updateOrderOfUserStatus(openID,null, goodsID)){
                    json.put("status", true);
                    return json;
                }
            } catch (Exception e){
                logger.debug("error:{}-->", e);
            }
        } else if(identity == 1){
            try {
                if(1 ==ordersMapper.updateOrderOfUserStatus(null, openID, goodsID)){
                    json.put("status", true);
                    return json;
                }
            } catch (Exception e){
                logger.debug("error:{}-->", e);
            }
        }

        json.put("status", false);
        return json;
    }
}
