package com.project_sop.newsservice.query;

import lombok.Data;

@Data
public class FindNewsById {
    private String _id;

    public FindNewsById(String _id) {
        this._id = _id;
    }
}
