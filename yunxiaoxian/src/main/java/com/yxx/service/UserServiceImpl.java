package com.yxx.service;

import com.yxx.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
}
