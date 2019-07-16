package com.myee.service;

import com.myee.pojo.AdminInfo;

import java.util.List;

public interface AdminInfoService {
    //查询所有admin信息
    public List<AdminInfo> selectAllAdmin();
}
