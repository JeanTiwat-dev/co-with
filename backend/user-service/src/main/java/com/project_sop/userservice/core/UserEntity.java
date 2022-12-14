package com.project_sop.userservice.core;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.io.Serializable;

@Data
@Document("User")
public class UserEntity implements Serializable {
    @Id
    private String _id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String img;
    private String role;
    private String tel;
    private String facebook;

    public UserEntity(){

    }

    public UserEntity(String _id, String firstname, String lastname, String email, String password, String img, String role, String tel, String facebook) {
        this._id = _id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.img = img;
        this.role = role;
        this.tel = tel;
        this.facebook = facebook;
    }
}
