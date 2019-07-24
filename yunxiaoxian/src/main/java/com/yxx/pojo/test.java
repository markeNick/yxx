package com.yxx.pojo;

import java.util.Random;

public class test {
    public static void main(String[] args) {
        Random rand = new Random();
        String[] imgName ={"1.jpg","2.jpg","3.png"};
        StringBuffer goodsImage=new StringBuffer();
        for (int i= 0;i<imgName.length;i++){
            if (i==0){
                goodsImage.append("http://43.103.18.92/pic/"+ rand.nextInt(9999999) + 100000+imgName[i].replaceAll(".+\\.", System.currentTimeMillis()+"."));
            }
            else {
                goodsImage.append(",http://43.103.18.92/pic/"+ rand.nextInt(9999999) + 100000+imgName[i].replaceAll(".+\\.", System.currentTimeMillis()+"."));
            }
        }
//        System.out.println(goodsImage);
        String str = "1234567890111";
        int n = 4;
        System.out.println(str.substring(str.length()-n));


    }

}
