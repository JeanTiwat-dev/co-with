package com.sop.backend.backend.rest;

import com.sop.backend.backend.pojo.Infected;
import com.sop.backend.backend.pojo.News;
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

    @RequestMapping(value = "/addNews", method = RequestMethod.POST)
    public ResponseEntity<?> addNews(@RequestBody News news){
        rabbitTemplate.convertAndSend("News", "addnews", news);
        System.out.println(news);
        return ResponseEntity.ok(news);
    }

    @RequestMapping(value = "/uploadImageNews", method = RequestMethod.POST)
    public boolean uploadStudentCard(@RequestParam("file") MultipartFile file) throws IOException {
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getName());
        System.out.println(file.getContentType());
        System.out.println(file.getSize());
        try{
            String Path_Directory = new ClassPathResource("static/image/news").getFile().getAbsolutePath();
//        String Path_Directory = "/Users/tathus/Downloads/backend/src/main/resources/static/image";
            System.out.println(Path_Directory);
            Files.copy(file.getInputStream(), Paths.get(Path_Directory+ File.separator+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
