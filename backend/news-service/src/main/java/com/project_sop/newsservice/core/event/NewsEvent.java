package com.project_sop.newsservice.core.event;

import lombok.Data;

@Data
public class NewsEvent {
    private String _id;
    private String title;
    private String release;
    private String content;
    private String image;
}
