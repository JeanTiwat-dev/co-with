package com.project_sop.userservice.query.rest;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserRestModel implements Serializable {
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
