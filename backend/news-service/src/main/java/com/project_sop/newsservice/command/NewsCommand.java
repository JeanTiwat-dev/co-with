package com.project_sop.newsservice.command;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Builder
@Data
public class NewsCommand {
    @TargetAggregateIdentifier
    private String _id;
    private String title;
    private String release;
    private String content;
    private String image;
}
