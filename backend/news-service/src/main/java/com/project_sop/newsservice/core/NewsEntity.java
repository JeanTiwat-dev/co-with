package com.project_sop.newsservice.core;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.io.Serializable;

@Data
@Document("News")
public class NewsEntity implements Serializable {
    @Id
    private String _id;
    private String title;
    private String release;
    private String content;
    private String image;
}
