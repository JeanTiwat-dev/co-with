package com.project_sop.newsservice.query;

import lombok.Data;

@Data
public class DeleteQueryNews {
    private String _id;

    public DeleteQueryNews(String _id) {
        this._id = _id;
    }
}

