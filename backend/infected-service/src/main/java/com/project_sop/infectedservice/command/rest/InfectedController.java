package com.project_sop.infectedservice.command.rest;


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
@RequestMapping("/infected")
public class InfectedController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final CommandGateway commandGateway;

    @Autowired
    public InfectedController(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @PostMapping
    public String createInfected(@RequestBody CreateInfectedRestModel createInfectedRestModel){
        try{
            Object message = rabbitTemplate.convertSendAndReceive("Infected","addinfected", createInfectedRestModel);
            return (String)message;
        }
        catch (Exception e){
            return "Error";
        }
    }

    @RequestMapping(value = "/uploadImageInfected", method = RequestMethod.POST)
    public boolean uploadImgInfected(@RequestParam("file") MultipartFile file) throws IOException {
        try{
            String Path_Directory = new ClassPathResource("static/img_infected").getFile().getAbsolutePath();
            Files.copy(file.getInputStream(), Paths.get(Path_Directory+ File.separator+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (Exception e){
            return false;
        }
    };
}
