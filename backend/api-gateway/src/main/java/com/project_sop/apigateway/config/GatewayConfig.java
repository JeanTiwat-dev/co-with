package com.project_sop.apigateway.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder){
        return builder.routes()
                .route("user-service", r-> r.path("/users/**").uri("lb://user-service"))
                .route("user-service", r-> r.path("/image/**").uri("lb://user-service"))
                .route("contacts-service", r-> r.path("/contacts/**").uri("lb://contacts-service"))
                .build();
    }

}
