package com.yxx.service;


import com.alibaba.fastjson.JSONObject;
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

     * 根据goods_id查询用户信息
     * @param goodsId
     * @return
     */
    public User selectUserByGoodsId(Integer goodsId);
    /**
     * 售出物品
     * @param openID
     * @return
     */
    public int soldMyGoods(String openID, Integer goodsID);

    /**
     * 擦亮物品
     * @param openID
     * @param goodsID
     * @return
     */
    public JSONObject updateGoodsCreateTime(String openID, Integer goodsID);

    /**
     * 下架--上架
     * @param openID
     * @param goodsID
     * @param flag  //true为下架，false为上架
     * @return
     */
    public JSONObject updateGoodsStatus(String openID, Integer goodsID, boolean flag);

    /**
     * 删除物品
     * @param openID
     * @param goodsID
     * @return
     */
    public JSONObject deleteGoods(String openID, Integer goodsID);
}