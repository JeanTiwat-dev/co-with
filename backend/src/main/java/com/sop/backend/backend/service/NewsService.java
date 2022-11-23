package com.sop.backend.backend.service;

import com.sop.backend.backend.pojo.Infected;
import com.sop.backend.backend.pojo.News;
import com.sop.backend.backend.pojo.user;
import com.sop.backend.backend.repository.NewsRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @RabbitListener(queues = "GetNews")
    public List<News> retrieveNews() {
        return newsRepository.findAll();
    }

    @RabbitListener(queues = "AddNews")
    public void createNews(News news){
        newsRepository.save(news);
//        return infected;
    }
    @RabbitListener(queues = "EditNews")
    public void retrieveEditNews(News news) {
        newsRepository.save(news) ;
    }

    @RabbitListener(queues = "EditImageNews")
    public void retrieveEditImageNews(News news) {
        newsRepository.save(news) ;
    }
}
