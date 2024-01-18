package com.opus.repository;

import com.opus.entity.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserTokenRepository extends JpaRepository<UserToken, Long> {

    UserToken findByToken(UUID token);
}
