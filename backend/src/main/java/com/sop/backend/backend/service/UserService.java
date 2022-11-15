package com.sop.backend.backend.service;

import com.sop.backend.backend.pojo.user;
import com.sop.backend.backend.repository.UserRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private static UserRepository userRepository;

    public  UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @RabbitListener(queues = "GetUser")
    public static List<user> retrieveUsers() {
        System.out.println(1);
        return userRepository.findAll();
    }
    @RabbitListener(queues = "LoginKey")
    public List<user> retrieveLogin(user User) {
        System.out.println(User.getPassword());
        System.out.println(User.getEmail());
        return userRepository.findByEmail(User.getEmail(), User.getPassword()) ;
    }
}
