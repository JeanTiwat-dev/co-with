package com.project_sop.userservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data
public class UpdateUserCommand {
    @TargetAggregateIdentifier
    private String _id;
    private String key;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String img;
    private String role;
    private String tel;
    private String facebook;
}
