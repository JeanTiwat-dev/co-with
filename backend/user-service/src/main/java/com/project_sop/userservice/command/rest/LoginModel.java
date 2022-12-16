package com.project_sop.userservice.command.rest;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginModel implements Serializable {
    private String email;
    private String password;
}
