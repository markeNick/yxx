package com.yxx.service;


import com.yxx.pojo.User;

import java.util.List;

public interface UserService{
    //查询user表所有用户信息
    public List<User> selectAllFormUser();
}