package com.yxx.service;

import com.yxx.dao.OrdersMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class OrderServiceImpl implements OrdersService {
    @Autowired
    private OrdersMapper ordersMapper;
}
