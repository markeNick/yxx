package com.yxx.dao;

import com.yxx.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    //查询user表所有用户信息
    public List<User> selectAllFormUser();

    /**
     * 根据openID查询用户信息
     * @param openID
     * @return
     */
    public User selectByOpenID(@Param("openID") String openID);

    /**
     * 根据openID更新用户信息
     * @param user
     * @return
     */
    public int updateUserByOpenID(User user);

    /**
     * 注册用户
     * @param user
     * @return
     */
    public int  registerUser(User user);
}
