package com.project_sop.userservice.core.data.event;

import lombok.Data;

@Data
public class UserUpdateEvent {
    private String _id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String img;
    private String role;
    private String tel;
    private String facebook;
}
