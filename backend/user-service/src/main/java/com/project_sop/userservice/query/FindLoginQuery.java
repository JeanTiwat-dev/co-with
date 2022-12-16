package com.project_sop.userservice.query;

import lombok.Data;

@Data
public class FindLoginQuery {
    private String email;
    private String password;

    public FindLoginQuery(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
