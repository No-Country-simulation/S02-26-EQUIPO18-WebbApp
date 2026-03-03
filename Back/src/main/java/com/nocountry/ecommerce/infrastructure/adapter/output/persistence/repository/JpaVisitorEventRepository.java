package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.repository;

import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.VisitorEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaVisitorEventRepository extends JpaRepository<VisitorEventEntity, Long> {
    List<VisitorEventEntity> findByVisitorUidOrderByCreatedAtDesc(String visitorUid);
}
