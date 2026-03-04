package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.VisitorEvent;
import java.util.List;

public interface VisitorEventRepositoryPort {
    VisitorEvent save(VisitorEvent event);
    List<VisitorEvent> findAll();
    List<VisitorEvent> findByVisitorUid(String visitorUid);
}
