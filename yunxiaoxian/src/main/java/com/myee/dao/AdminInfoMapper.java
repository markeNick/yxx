package com.myee.dao;

import com.myee.pojo.AdminInfo;

import java.util.List;

public interface AdminInfoMapper {
    //查询所有admin信息
    public List<AdminInfo> selectAllAdmin();
}
