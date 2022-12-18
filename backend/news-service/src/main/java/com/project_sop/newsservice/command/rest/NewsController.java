package com.project_sop.newsservice.command.rest;


import com.project_sop.newsservice.core.NewsEntity;
import com.project_sop.newsservice.query.rest.NewsRestModel;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final CommandGateway commandGateway;

    @Autowired
    public NewsController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String UpdateUsers(@RequestBody UpdateAndCreateNewsRestModel updateAndCreateNewsRestModel){
        try{
            Object message = rabbitTemplate.convertSendAndReceive("News","addnews", updateAndCreateNewsRestModel);
            return (String)message;
        }
        catch (Exception e){
            return "Error";
        }
    }
    @RequestMapping(value = "/updateImageNews", method = RequestMethod.POST, consumes = "multipart/form-data")
    public boolean updateImage(@RequestParam("file") MultipartFile file, @RequestParam("_id") NewsEntity model) throws IOException {
        UpdateAndCreateNewsRestModel updateAndCreateNewsRestModel = new UpdateAndCreateNewsRestModel();
        updateAndCreateNewsRestModel.set_id(model.get_id());
        Object getUser = rabbitTemplate.convertSendAndReceive("News","getNewsId", updateAndCreateNewsRestModel);
        UpdateAndCreateNewsRestModel OldValue = (UpdateAndCreateNewsRestModel) getUser;
        OldValue.setImage("/img_news/" + file.getOriginalFilename());
        String Path_Directory = new ClassPathResource("static/img_news").getFile().getAbsolutePath();
//        Files.delete(Path.of(Path_Directory+(OldValue.getImg()).split("image/img_aj")[1]));
////        /Users/tathus/Documents/SOP/co-with/backend/user-service/target/classes/static/image/img_aj/ca67a929-dc99-4215-ba05-e12f3e115ec8.jpg
        Files.copy(file.getInputStream(), Paths.get(Path_Directory+ File.separator+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        rabbitTemplate.convertAndSend("News","editimagenews", OldValue);
        return true;
    }

    @RequestMapping(value = "/uploadImageNews", method = RequestMethod.POST)
    public boolean uploadStudentCard(@RequestParam("file") MultipartFile file) throws IOException {
        try{
            String Path_Directory = new ClassPathResource("static/img_news").getFile().getAbsolutePath();
            Files.copy(file.getInputStream(), Paths.get(Path_Directory+ File.separator+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (Exception e){
            return false;
        }
    };

    @RequestMapping(value = "/deleteNews", method = RequestMethod.POST)
    public boolean deleteNews (@RequestBody NewsRestModel newsRestModel) throws IOException{
//        System.out.println(news);
        try{
            rabbitTemplate.convertAndSend("News", "deletenews", newsRestModel);
            return true;
        }
        catch(Exception e){
            return false;
        }
//        System.out.println(news);
//        return ResponseEntity.ok(news);

    }
}
