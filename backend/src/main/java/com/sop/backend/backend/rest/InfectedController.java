package com.sop.backend.backend.rest;

import com.sop.backend.backend.pojo.Infected;
import com.sop.backend.backend.pojo.News;
import com.sop.backend.backend.service.InfectedService;
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
public class InfectedController {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private InfectedService infectedService;
    @RequestMapping(value = "/getInfected", method = RequestMethod.GET)
    public ResponseEntity<?> getNews() {
        try{
            Object allInfected = rabbitTemplate.convertSendAndReceive("Infected","getinfected", "");
            return ResponseEntity.ok((List<Infected>) allInfected);
        }
        catch (Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/addInfected", method = RequestMethod.POST)
    public ResponseEntity<?> addInfected(@RequestBody Infected infected){
        rabbitTemplate.convertAndSend("Infected", "addinfected", infected);
        System.out.println(infected);
        return ResponseEntity.ok(infected);
    }

    @RequestMapping(value = "/uploadImageInfected", method = RequestMethod.POST)
    public boolean uploadStudentCard(@RequestParam("file") MultipartFile file) throws IOException {
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getName());
        System.out.println(file.getContentType());
        System.out.println(file.getSize());
        try{
            String Path_Directory = new ClassPathResource("static/image/Infected").getFile().getAbsolutePath();
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
