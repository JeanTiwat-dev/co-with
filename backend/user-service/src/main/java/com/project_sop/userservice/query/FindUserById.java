package com.project_sop.userservice.query;

import lombok.Data;

@Data
public class FindUserById {
    private String _id;

    public FindUserById(String _id) {
        this._id = _id;
    }
}
