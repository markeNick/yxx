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

    @Override
    public User selectUserByOpenID(String openID) {

        return userMapper.selectByOpenID(openID);
    }

    @Override
    public int updateUser(User user) {

        return userMapper.updateUserByOpenID(user);
    }

    @Override
    public int registerUser(User user) {

        return userMapper.registerUser(user);
    }

    @Override
    public User selectUserByGoodsId(Integer goodsId) {
        return userMapper.selectUserByGoodsId(goodsId);
    }
    @Override
    public int soldMyGoods(String openID, Integer goodsID) {
        return userMapper.updateMySoldGoodsStatus(openID, goodsID);
    }
}
