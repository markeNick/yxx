package com.yxx.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class Goods {
    private Integer goods_id;
    private String goods_name;
    private String goods_describe;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    private float goods_price;
=======
    private BigDecimal goods_price;
>>>>>>> 0c493051aa47780d3eaad1bc939a2098d7eab286
=======
    private BigDecimal goods_price;
>>>>>>> linxianchang
=======
    private BigDecimal goods_price;
>>>>>>> c7e6c0c5c766e5433270a073661edf386a9d45b5
    private String goods_image;
    private Integer category_id;
    private Integer status;
    private Date create_time;
    private Date sale_time;
    private String openID;
<<<<<<< HEAD


    public BigDecimal getGoods_price() {
        return goods_price;
    }

    public void setGoods_price(BigDecimal goods_price) {
        this.goods_price = goods_price;
    }

    public String getGoods_image() {
        return goods_image;
    }

    public void setGoods_image(String goods_image) {
        this.goods_image = goods_image;
    }

=======
    
>>>>>>> c7e6c0c5c766e5433270a073661edf386a9d45b5
    public Integer getGoods_id() {
        return goods_id;
    }

    public void setGoods_id(Integer goods_id) {
        this.goods_id = goods_id;
    }

    public String getGoods_name() {
        return goods_name;
    }

    public void setGoods_name(String goods_name) {
        this.goods_name = goods_name;
    }

    public String getGoods_describe() {
        return goods_describe;
    }

    public void setGoods_describe(String goods_describe) {
        this.goods_describe = goods_describe;
    }

    public BigDecimal getGoods_price() {
        return goods_price;
    }

    public void setGoods_price(BigDecimal goods_price) {
        this.goods_price = goods_price;
    }

    public String getGoods_image() {
        return goods_image;
    }

    public void setGoods_image(String goods_image) {
        this.goods_image = goods_image;
    }

    public Integer getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Integer category_id) {
        this.category_id = category_id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public Date getSale_time() {
        return sale_time;
    }

    public void setSale_time(Date sale_time) {
        this.sale_time = sale_time;
    }

    public String getOpenID() {
        return openID;
    }

    public void setOpenID(String openID) {
        this.openID = openID;
    }
}
