package com.sop.backend.backend.rest;

import com.sop.backend.backend.pojo.News;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NewsController {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @RequestMapping(value = "/getNews", method = RequestMethod.GET)
    public ResponseEntity<?> getNews() {
        try{
            Object allNews = rabbitTemplate.convertSendAndReceive("News","getnews", "");
            return ResponseEntity.ok((List<News>) allNews);
        }
        catch (Exception e){
            return null;
        }
    }
}
