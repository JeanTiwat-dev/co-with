package com.sop.backend.backend.pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document("News")
public class News implements Serializable {
    @Id
    private String _id;
    private String title;
    private String release;
    private String content;
    private String image;

    public News() {
    }

    public News(String _id, String title, String release, String content, String image) {
        this._id = _id;
        this.title = title;
        this.release = release;
        this.content = content;
        this.image = image;
    }
}
