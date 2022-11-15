package com.sop.backend.backend.rest;

import com.sop.backend.backend.pojo.user;
import com.sop.backend.backend.service.UserService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private RabbitTemplate rabbitTemplate;
    private List<String> listLogin = new ArrayList();
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
}
