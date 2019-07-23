package com.yxx.service;


import com.yxx.pojo.User;

import java.util.List;

public interface UserService{
    //查询user表所有用户信息
    public List<User> selectAllFormUser();

    /**
     * 根据openID查询用户
     * @param openID
     * @return
     */
    public User selectUserByOpenID(String openID);

    /**
     * 更新用户信息
     * @param user
     */
    public int updateUser(User user);

    /**
     * 注册用户
     * @param user
     */
    public int registerUser(User user);

    /**
     * 售出物品
     * @param openID
     * @return
     */
    public int soldMyGoods(String openID, Integer goodsID);

}