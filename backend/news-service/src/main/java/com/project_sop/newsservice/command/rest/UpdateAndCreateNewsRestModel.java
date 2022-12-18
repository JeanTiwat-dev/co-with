package com.project_sop.newsservice.command.rest;

import lombok.Data;

import java.io.Serializable;

@Data
public class UpdateAndCreateNewsRestModel implements Serializable {
    private String _id;
    private String title;
    private String release;
    private String content;
    private String image;
}
