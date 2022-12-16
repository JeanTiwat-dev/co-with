package com.project_sop.userservice.core.data;

import com.project_sop.userservice.core.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<UserEntity, String > {
    @Query(value = "{email: '?0', password :  '?1'}")
    public UserEntity findByEmail(String email, String password);

    @Query( "{_id: '?0'}")
    public List<UserEntity> findByid(String id);

    @Query( "{_id: '?0'}")
    public UserEntity findByUserid(String id);
}
