package com.myee.service;

import com.myee.dao.AdminInfoMapper;
import com.myee.pojo.AdminInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AdminInfoServiceImpl implements AdminInfoService {
    @Autowired
    private AdminInfoMapper adminInfoMapper;

    //查询所有admin信息
    @Override
    public List<AdminInfo> selectAllAdmin() {
        return adminInfoMapper.selectAllAdmin();
    }
}
