package com.sop.backend.backend.rest;

import com.sop.backend.backend.pojo.user;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private RabbitTemplate rabbitTemplate;
    @RequestMapping(value = "/getUser", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(){
        try{
            Object allUser = rabbitTemplate.convertSendAndReceive("User","getuser", "");
            return ResponseEntity.ok((List<user>) allUser);
        }
        catch (Exception e){
            return null;
        }
    }
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody user User){
        try {
            Object loginItem = rabbitTemplate.convertSendAndReceive("User", "login", User);
            return ResponseEntity.ok((List<user>) loginItem );
        }
        catch (Exception e) {
            return null;
        }
    }
    @RequestMapping(value = "/getUserbyId", method = RequestMethod.POST)
    public ResponseEntity<?> getUserbyId(@RequestBody user User){
//        System.out.println(User);
        try{
            Object allUser = rabbitTemplate.convertSendAndReceive("User","getuserid", User);
            return ResponseEntity.ok((List<user>) allUser);
        }
        catch (Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/updateprofile", method = RequestMethod.POST)
    public boolean UpdateProfile(@RequestBody user User){
//        System.out.println(User);
        try{
            Object getUser = rabbitTemplate.convertSendAndReceive("User","getuserbyid", User);
            user OldValue = (user)getUser;
            OldValue.setFirstname(User.getFirstname());
            OldValue.setLastname(User.getLastname());
            OldValue.setEmail(User.getEmail());
            OldValue.setTel(User.getTel());
            OldValue.setFacebook(User.getFacebook());
//            System.out.println(OldValue);
            rabbitTemplate.convertAndSend("User","updateprofile", OldValue);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    @RequestMapping(value = "/updateImageProfile", method = RequestMethod.POST, consumes = "multipart/form-data")
    public boolean addForm(@RequestParam("imageProfile") MultipartFile file, @RequestParam("_id") user User) throws IOException {
//        System.out.println(file.getOriginalFilename());
        User.setImg("/image/img_aj/" + file.getOriginalFilename());
//        Object getUser = rabbitTemplate.convertSendAndReceive("User","getuserbyid", User);
//        user OldValue = (user)getUser;
        String Path_Directory = new ClassPathResource("static/image/img_aj").getFile().getAbsolutePath();
        Files.copy(file.getInputStream(), Paths.get(Path_Directory+ File.separator+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        rabbitTemplate.convertAndSend("User","updateimageprofile", User);
//        return "Success";
        return true;
    }
}
