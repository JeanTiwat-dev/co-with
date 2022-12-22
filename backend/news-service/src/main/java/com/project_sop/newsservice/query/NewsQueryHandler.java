package com.project_sop.newsservice.query;

import com.project_sop.newsservice.command.rest.UpdateAndCreateNewsRestModel;
import com.project_sop.newsservice.core.NewsEntity;
import com.project_sop.newsservice.core.data.NewsRepository;
import com.project_sop.newsservice.query.rest.NewsRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class NewsQueryHandler {

    @Autowired
    private NewsRepository newsRepository;

    public NewsQueryHandler(NewsRepository newsRepository){
        this.newsRepository = newsRepository;
    }
    @QueryHandler
    public List<NewsRestModel> findUser(FindNewsQuery findUserQuery){
        List<NewsRestModel> news = new ArrayList<>();
        List<NewsEntity> entity = newsRepository.findAll();
        for (NewsEntity e: entity
        ) {
            NewsRestModel newsRestModel = new NewsRestModel();
            BeanUtils.copyProperties(e, newsRestModel);
            news.add(newsRestModel);
        }
        return news;
    }

    @QueryHandler
    public UpdateAndCreateNewsRestModel UpdateNews(FindNewsById findNewsById){
        NewsEntity newsEntity = newsRepository.findByNewid(findNewsById.get_id());
        UpdateAndCreateNewsRestModel user = new UpdateAndCreateNewsRestModel();
        if(newsEntity != null){
            BeanUtils.copyProperties(newsEntity, user);
        }
        return user;
    }
    @QueryHandler
    public boolean DeleteNews(DeleteQueryNews deleteQueryNews){
        try{
            NewsEntity newsEntity = new NewsEntity();
            newsEntity.set_id(deleteQueryNews.get_id());
            newsRepository.delete(newsEntity);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
