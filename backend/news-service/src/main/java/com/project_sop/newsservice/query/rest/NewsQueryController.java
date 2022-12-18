package com.project_sop.newsservice.query.rest;


import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsQueryController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping
    public List<NewsRestModel> getNews(){
        try{
            System.out.println(1);
            Object allNews = rabbitTemplate.convertSendAndReceive("News","getnews", "");
            return ((List<NewsRestModel>) allNews);
        }
        catch (Exception e){
            return null;
        }
    }
}
