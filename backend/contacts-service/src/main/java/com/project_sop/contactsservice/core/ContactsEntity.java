package com.project_sop.contactsservice.core;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@Document("Contacts")
public class ContactsEntity {
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
}
