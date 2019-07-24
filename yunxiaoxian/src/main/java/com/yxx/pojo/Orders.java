package com.yxx.pojo;

import java.util.Date;

public class Orders {
    private Integer ordersId;
    private Integer goodsId;
    private Integer status;
    private String buyer;
    private String seller;
    private Date createTime;
    private Integer buyer_status;
    private Integer seller_status;

    public Integer getOrdersId() {
        return ordersId;
    }

    public void setOrdersId(Integer ordersId) {
        this.ordersId = ordersId;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getBuyer_status() {
        return buyer_status;
    }

    public void setBuyer_status(Integer buyer_status) {
        this.buyer_status = buyer_status;
    }

    public Integer getSeller_status() {
        return seller_status;
    }

    public void setSeller_status(Integer seller_status) {
        this.seller_status = seller_status;
    }
}
