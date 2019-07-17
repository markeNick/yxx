package com.yxx.service;

import com.yxx.dao.CollectionMapper;
import com.yxx.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;

public class CollectionServiceImpl implements CollectionService {
    @Autowired
    private CollectionMapper collectionMapper;
}
