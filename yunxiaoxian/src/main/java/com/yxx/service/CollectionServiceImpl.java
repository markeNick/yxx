package com.yxx.service;

import com.yxx.dao.CollectionMapper;
import com.yxx.pojo.GoodsCustom;
import com.yxx.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.Inet4Address;
import java.util.List;

@Service
public class CollectionServiceImpl implements CollectionService {
    @Autowired
    private CollectionMapper collectionMapper;

    @Override
    public List<GoodsCustom> selectUserCollerction(String openID, Integer currentPage) {

        return collectionMapper.selectUserCollectionByOpenID(openID, currentPage);
    }

    @Override
    public int insertUserCollection(String openID, Integer goodsID) {
        return collectionMapper.insertUserCollection(openID, goodsID);
    }
}
