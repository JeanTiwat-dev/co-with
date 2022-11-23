package com.sop.backend.backend.rest;

import com.sop.backend.backend.pojo.News;
import com.sop.backend.backend.pojo.user;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
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
public class NewsController {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @RequestMapping(value = "/getNews", method = RequestMethod.GET)
    public ResponseEntity<?> getNews() {
        try{
            Object allNews = rabbitTemplate.convertSendAndReceive("News","getnews", "");
            return ResponseEntity.ok((List<News>) allNews);
        }
        catch (Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/editnews", method = RequestMethod.POST)
    public boolean EditNews(@RequestBody News news){
//        System.out.println(news);
        try{
//            Object getUser = rabbitTemplate.convertSendAndReceive("User","getuserbyid", User);
//            user OldValue = (user)getUser;
//            OldValue.setFirstname(User.getFirstname());
//            OldValue.setLastname(User.getLastname());
//            OldValue.setEmail(User.getEmail());
//            OldValue.setTel(User.getTel());
//            OldValue.setFacebook(User.getFacebook());
////            System.out.println(OldValue);
            rabbitTemplate.convertAndSend("News","editnews", news);
            return true;
        }
        catch (Exception e){
            return false;
        }
//        return true;
    }

    @RequestMapping(value = "/EditImageNews", method = RequestMethod.POST, consumes = "multipart/form-data")
    public boolean addForm(@RequestParam("imageNews") MultipartFile file, @RequestParam("_id") News news) throws IOException {
//        System.out.println(file.getOriginalFilename());
        news.setImage("/image/news/" + file.getOriginalFilename());
//        Object getUser = rabbitTemplate.convertSendAndReceive("User","getuserbyid", User);
//        user OldValue = (user)getUser;
        String Path_Directory = new ClassPathResource("static/image/news").getFile().getAbsolutePath();
        Files.copy(file.getInputStream(), Paths.get(Path_Directory+ File.separator+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        rabbitTemplate.convertAndSend("News","editimagenews", news);
//        return "Success";
        return true;
    }
}
