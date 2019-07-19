package com.yxx.service;

import com.yxx.dao.UserMapper;
import com.yxx.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> selectAllFormUser() {
        return userMapper.selectAllFormUser();
    }
}
