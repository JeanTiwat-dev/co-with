package com.sop.backend.backend.pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document("Contacts")
public class ContactsAJ implements Serializable {
    @Id
    private String _id;
    private String name;
    private String email;
    private String tel;
    private String facebook;
    private String img;

    public ContactsAJ() {
    }

    public ContactsAJ(String _id, String name, String email, String tel, String facebook, String img) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.tel = tel;
        this.facebook = facebook;
        this.img = img;
    }
}
