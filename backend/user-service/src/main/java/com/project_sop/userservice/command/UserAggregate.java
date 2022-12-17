package com.project_sop.userservice.command;


import com.project_sop.userservice.core.event.UserUpdateEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.util.UUID;

@Aggregate
public class UserAggregate {
    private String _id;
    @AggregateIdentifier
    private String key = UUID.randomUUID().toString();
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String img;
    private String role;
    private String tel;
    private String facebook;

    public  UserAggregate(){

    }

    @CommandHandler
    public UserAggregate(UpdateUserCommand command){
        if(command.getEmail().indexOf("@it.kmitl.ac.th") < 0){
            throw new IllegalArgumentException("Email is not Used");
        }
        if(command.getPassword().length() < 8){
            throw new IllegalArgumentException("you have to enter at least 8 digit!");
        }

        UserUpdateEvent userUpdateEvent = new UserUpdateEvent();
        BeanUtils.copyProperties(command, userUpdateEvent);
        AggregateLifecycle.apply(userUpdateEvent);
    }

    @EventSourcingHandler
    public void on(UserUpdateEvent userUpdateEvent){
        this._id = userUpdateEvent.get_id();
        this.firstname = userUpdateEvent.getFirstname();
        this.lastname = userUpdateEvent.getLastname();
        this.email = userUpdateEvent.getEmail();
        this.password = userUpdateEvent.getPassword();
        this.img = userUpdateEvent.getImg();
        this.role = userUpdateEvent.getRole();
        this.tel = userUpdateEvent.getTel();
        this.facebook = userUpdateEvent.getFacebook();
    }
}
