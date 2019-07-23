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
<<<<<<< HEAD

     * 根据goods_id查询用户信息
     * @param goodsId
     * @return
     */
    public User selectUserByGoodsId(Integer goodsId);
    /**
=======
>>>>>>> 9de3f80ea5cc26cdeb8dc3aeb3fe76adb83cc4e6
     * 售出物品
     * @param openID
     * @return
     */
    public int soldMyGoods(String openID, Integer goodsID);
<<<<<<< HEAD

=======
>>>>>>> 9de3f80ea5cc26cdeb8dc3aeb3fe76adb83cc4e6

}