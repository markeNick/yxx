package com.yxx.controller;

import com.alibaba.fastjson.JSONObject;
import com.yxx.pojo.Goods;
import com.yxx.pojo.User;
import com.yxx.service.UserService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.RequestWrapper;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/test")
    public String test(){
        return "index";
    }

    //发布商品
    @RequestMapping(value = "/publishMyGoods")
    @ResponseBody
    public JSONObject publishMyGoods(@ModelAttribute("goods") Goods goods, HttpServletRequest req, HttpServletResponse res, MultipartFile attach){
        JSONObject json =new JSONObject();
        if(attach==null||attach.getSize()==0){//非空检测
            json.put("error","*图片不能为空!");
            return json;
        }else if(attach.getSize()>5120000){//检测文件大小
            json.put("error","*上传图片不能超过5MB");
            return json;
        }
        else{
            //获取文件名
            String oldName =attach.getOriginalFilename();
            //获取文件后缀名
            String suffix = FilenameUtils.getExtension(oldName);
            if(!(suffix.equalsIgnoreCase("jpg")||
                    suffix.equalsIgnoreCase("png")||
                    suffix.equalsIgnoreCase("jpeg")||
                    suffix.equalsIgnoreCase("pneg"))
            ){json.put("error","*请选择格式为jpg,png,jpeg,pneg的图片");
                return json;
            }else{
                //获取本地存储路径
                String path ="F://文件上传数据库";
                //设置新图片名，获取用户ID
                UUID randomUUID = UUID.randomUUID();
                String userId=null;
                userId = (String)req.getSession().getAttribute("userid");
                String newName=System.currentTimeMillis()+userId+randomUUID.toString()+"."+suffix;//图片名=时间戳+随机数+用户id
                //在本地设置存储空间
                File file=new File(path,newName);
                if(!file.exists()){//假如不存在则创建一个
                    file.mkdirs();
                }
                //向product存入商品id,用户id,上架时间,销售状态,图片路径
                if(userId!=null){
                    String id=System.currentTimeMillis()+randomUUID.toString()+userId;//商品id=随机数+时间戳+用户id
                    String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                    try {
                        attach.transferTo(file);
                        json.put("success","*上传成功!");
                        return json;
                    } catch (IllegalStateException | IOException e) {
                        e.printStackTrace();
                    }
                }
                json.put("error","*上传失败!");
                return json;

            }
        }
    }
}
