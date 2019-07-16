package com.myee.pojo;

public class UserInfo {
    private Integer userID;
    private String userName;
    private String userPassword;
    private String userPhone;
    private String userIDcard;
    private Integer userIsControl;//控制权
    private String userBeneficiary;//遗产继承人
    private Integer userIsCredit;//信用

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public String getUserIDcard() {
        return userIDcard;
    }

    public void setUserIDcard(String userIDcard) {
        this.userIDcard = userIDcard;
    }

    public Integer getUserIsControl() {
        return userIsControl;
    }

    public void setUserIsControl(Integer userIsControl) {
        this.userIsControl = userIsControl;
    }

    public String getUserBeneficiary() {
        return userBeneficiary;
    }

    public void setUserBeneficiary(String userBeneficiary) {
        this.userBeneficiary = userBeneficiary;
    }

    public Integer getUserIsCredit() {
        return userIsCredit;
    }

    public void setUserIsCredit(Integer userIsCredit) {
        this.userIsCredit = userIsCredit;
    }

}
