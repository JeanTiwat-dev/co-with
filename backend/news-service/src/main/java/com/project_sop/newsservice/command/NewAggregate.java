package com.project_sop.newsservice.command;


import com.project_sop.newsservice.core.event.NewsEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.BeanUtils;

import java.util.UUID;

@Aggregate
public class NewAggregate {
    private String _id;
    @AggregateIdentifier
    private String key = UUID.randomUUID().toString();
    private String title;
    private String release;
    private String content;
    private String image;

    public NewAggregate(){

    }

    @CommandHandler
    public NewAggregate(NewsCommand command){
        if(command.getTitle().isBlank() || command.getTitle() == null){
            throw new IllegalArgumentException("Title is not null");
        }
        if(command.getContent().isBlank() || command.getContent() == null){
            throw new IllegalArgumentException("Content is not null");
        }
        if(command.getRelease().isBlank() || command.getRelease() == null){
            throw new IllegalArgumentException("Release is not null");
        }

        NewsEvent newsEvent = new NewsEvent();
        BeanUtils.copyProperties(command, newsEvent);
        AggregateLifecycle.apply(newsEvent);
    }

    @EventSourcingHandler
    public void on(NewsEvent newsEvent){
        this._id = newsEvent.get_id();
        this.title = newsEvent.getTitle();
        this.release = newsEvent.getRelease();
        this.content = newsEvent.getContent();
        this.image = newsEvent.getImage();
    }
}
