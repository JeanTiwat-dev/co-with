package com.project_sop.userservice.query;


import com.project_sop.userservice.core.UserEntity;
import com.project_sop.userservice.core.data.UserRepository;
import com.project_sop.userservice.core.event.UserUpdateEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserEventsHandler {

    @Autowired
    UserRepository userRepository;

    public UserEventsHandler(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @EventHandler
    public void on(UserUpdateEvent event){
        UserEntity user = new UserEntity();
        BeanUtils.copyProperties(event, user);
        userRepository.save(user);
    }

}
