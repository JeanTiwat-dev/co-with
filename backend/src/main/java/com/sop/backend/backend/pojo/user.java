package com.sop.backend.backend.pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document("User")
public class user implements Serializable {
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

    public user() {}
    public user(String _id, String firstname, String lastname, String email, String password, String img, String role, String tel, String facebook) {
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
