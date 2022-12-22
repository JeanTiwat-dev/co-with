package com.project_sop.newsservice.service;

import com.project_sop.newsservice.command.rest.UpdateAndCreateNewsRestModel;
import com.project_sop.newsservice.core.NewsEntity;
import com.project_sop.newsservice.core.data.NewsRepository;
import com.project_sop.newsservice.query.DeleteQueryNews;
import com.project_sop.newsservice.query.FindNewsById;
import com.project_sop.newsservice.query.FindNewsQuery;
import com.project_sop.newsservice.query.rest.NewsRestModel;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class NewsQueryService {
    @Autowired
    private static NewsRepository newsRepository;

    @Autowired
    QueryGateway queryGateway;

    public NewsQueryService(NewsRepository newsRepository){
        this.newsRepository = newsRepository;
    }

    @RabbitListener(queues = "GetNews")
    public List<NewsRestModel> retrieveUsers() {
        FindNewsQuery findNewsQuery = new FindNewsQuery();
        List<NewsRestModel> news = queryGateway
                .query(findNewsQuery, ResponseTypes.multipleInstancesOf(NewsRestModel.class)).join();
        return news;
    }

    @RabbitListener(queues = "GetNewId")
    public UpdateAndCreateNewsRestModel getUserById(UpdateAndCreateNewsRestModel updateUserRestModel){
        FindNewsById findUserById = new FindNewsById(updateUserRestModel.get_id());
        List<UpdateAndCreateNewsRestModel> user = queryGateway
                .query(findUserById, ResponseTypes.multipleInstancesOf(UpdateAndCreateNewsRestModel.class)).join();
        return user.get(0);
    }

    @RabbitListener(queues = "EditImageNews")
    public void retrieveUpdateImageProfile(UpdateAndCreateNewsRestModel updateAndCreateNewsRestModel) {
        NewsEntity news = new NewsEntity();
        BeanUtils.copyProperties(updateAndCreateNewsRestModel, news);
        newsRepository.save(news) ;
    }

    @RabbitListener(queues = "DeleteNews")
    public void deleteNews(NewsRestModel news){
        DeleteQueryNews deleteQueryNews = new DeleteQueryNews(news.get_id());
        queryGateway
                .query(deleteQueryNews, ResponseTypes.multipleInstancesOf(boolean.class)).join();
    }
}
