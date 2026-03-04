package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.mapper;

import com.nocountry.ecommerce.domain.model.Order;
import com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity.OrderEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    private final PlanMapper planMapper;
    private final MetadataMapper metadataMapper;
    private final CampaignMapper campaignMapper;
    private final BusinessMapper businessMapper;

    public Order toDomain(OrderEntity entity) {
        if (entity == null)
            return null;
        return Order.builder()
                .id(entity.getId())
                .date(entity.getDate())
                .plan(planMapper.toDomain(entity.getPlan()))
                .priceTotal(entity.getPriceTotal())
                .metadata(metadataMapper.toDomain(entity.getMetadata()))
                .campaign(campaignMapper.toDomain(entity.getCampaign()))
                .business(businessMapper.toDomain(entity.getBusiness()))
                .stripeInvoiceId(entity.getStripeInvoiceId())
                .urlRecibo(entity.getUrlRecibo())
                .status(entity.getStatus())
                .build();
    }

    public OrderEntity toEntity(Order domain) {
        if (domain == null)
            return null;
        return OrderEntity.builder()
                .id(domain.getId())
                .date(domain.getDate())
                .plan(planMapper.toEntity(domain.getPlan()))
                .priceTotal(domain.getPriceTotal())
                .metadata(metadataMapper.toEntity(domain.getMetadata()))
                .campaign(campaignMapper.toEntity(domain.getCampaign()))
                .business(businessMapper.toEntity(domain.getBusiness()))
                .stripeInvoiceId(domain.getStripeInvoiceId())
                .urlRecibo(domain.getUrlRecibo())
                .status(domain.getStatus())
                .build();
    }
}
