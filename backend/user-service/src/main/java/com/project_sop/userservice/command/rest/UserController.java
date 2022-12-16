package com.project_sop.userservice.command.rest;


import com.project_sop.userservice.core.UserEntity;
import com.project_sop.userservice.query.rest.UserRestModel;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final CommandGateway commandGateway;

    @Autowired
    public UserController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String addUser(@RequestBody UpdateUserRestModel updateUserRestModel){
        try{
            Object getUser = rabbitTemplate.convertSendAndReceive("User","getuserbyid", updateUserRestModel);
            UpdateUserRestModel OldValue = (UpdateUserRestModel) getUser;
            OldValue.setFirstname(updateUserRestModel.getFirstname());
            OldValue.setLastname(updateUserRestModel.getLastname());
            OldValue.setEmail(updateUserRestModel.getEmail());
            OldValue.setTel(updateUserRestModel.getTel());
            OldValue.setFacebook(updateUserRestModel.getFacebook());
            Object message = rabbitTemplate.convertSendAndReceive("User","updateprofile", OldValue);
            return (String)message;
        }
        catch (Exception e){
            return "Error";
        }
    }
    @RequestMapping(value = "/updateImageProfile", method = RequestMethod.POST, consumes = "multipart/form-data")
    public boolean updateImage(@RequestParam("imageProfile") MultipartFile file, @RequestParam("_id")  UserEntity userEntity) throws IOException {
        System.out.println(userEntity.get_id());
        UpdateUserRestModel updateUserRestModel = new UpdateUserRestModel();
        updateUserRestModel.set_id(userEntity.get_id());
        Object getUser = rabbitTemplate.convertSendAndReceive("User","getuserbyid", updateUserRestModel);
        UpdateUserRestModel OldValue = (UpdateUserRestModel) getUser;
        OldValue.setImg("/image/img_aj/" + file.getOriginalFilename());
        String Path_Directory = new ClassPathResource("static/image/img_aj").getFile().getAbsolutePath();
//        Files.delete(Path.of(Path_Directory+(OldValue.getImg()).split("image/img_aj")[1]));
////        /Users/tathus/Documents/SOP/co-with/backend/user-service/target/classes/static/image/img_aj/ca67a929-dc99-4215-ba05-e12f3e115ec8.jpg
        Files.copy(file.getInputStream(), Paths.get(Path_Directory+ File.separator+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        rabbitTemplate.convertAndSend("User","updateimageprofile", OldValue);
        return true;
    }
    @RequestMapping(value = "/test")
    public String test(@RequestParam("imageProfile") MultipartFile file){
        return file.getOriginalFilename()+"";
    }

    @RequestMapping("/login")
    public UserRestModel login(@RequestBody LoginModel loginModel){
        try{
            Object getUser = rabbitTemplate.convertSendAndReceive("User","login", loginModel);
            UserRestModel user = (UserRestModel) getUser;
            if(user.get_id() != null){
                return user;
            }
            else{
               return null;
            }
        }
        catch (Exception e){
            return  null;
        }
    }

    @RequestMapping("/getUserId")
    public UpdateUserRestModel getUserId(@RequestBody UpdateUserRestModel updateUserRestModel){
        Object getUser = rabbitTemplate.convertSendAndReceive("User","getuserbyid", updateUserRestModel);
        return (UpdateUserRestModel) getUser;
    }
}
