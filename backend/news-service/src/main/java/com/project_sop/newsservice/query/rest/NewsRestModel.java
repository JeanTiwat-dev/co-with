package com.project_sop.newsservice.query.rest;

import lombok.Data;

import java.io.Serializable;

@Data
public class NewsRestModel implements Serializable {
    private String _id;
    private String title;
    private String release;
    private String content;
    private String image;
}
