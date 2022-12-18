package com.project_sop.newsservice.query;


import com.project_sop.newsservice.core.NewsEntity;
import com.project_sop.newsservice.core.data.NewsRepository;
import com.project_sop.newsservice.core.event.NewsEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NewsEventsHandler {

    @Autowired
    NewsRepository newsRepository;

    public NewsEventsHandler(NewsRepository newsRepository){
        this.newsRepository = newsRepository;
    }

    @EventHandler
    public void on(NewsEvent event){
        NewsEntity news = new NewsEntity();
        BeanUtils.copyProperties(event, news);
        newsRepository.save(news);
    }

}
