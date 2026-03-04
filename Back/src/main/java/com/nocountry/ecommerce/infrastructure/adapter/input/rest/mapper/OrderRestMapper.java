package com.nocountry.ecommerce.infrastructure.adapter.input.rest.mapper;

import com.nocountry.ecommerce.domain.model.*;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.CheckoutResponseDTO;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.OrderRequest;
import com.nocountry.ecommerce.infrastructure.adapter.input.rest.dto.OrderResponse;
import org.springframework.stereotype.Component;

@Component
public class OrderRestMapper {

    public Order toDomain(OrderRequest request) {
        if (request == null)
            return null;

        return Order.builder()
                .plan(Plan.builder().id(request.getPlanId()).build())
                .business(toBusinessDomain(request.getBusiness()))
                .campaign(toCampaignDomain(request.getCampaign()))
                .metadata(toMetadataDomain(request.getMetadata()))
                .build();
    }

    private Business toBusinessDomain(OrderRequest.BusinessRequest request) {
        if (request == null)
            return null;
        return Business.builder()
                .name(request.getName())
                .activity(request.getActivity())
                .type(request.getType())
                .state(request.getState())
                .owner(toPersonDomain(request.getOwner()))
                .address(toAddressDomain(request.getAddress()))
                .build();
    }

    private Person toPersonDomain(OrderRequest.PersonRequest request) {
        if (request == null)
            return null;
        return Person.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .emailAddress(request.getEmailAddress())
                .address(toAddressDomain(request.getAddress()))
                .build();
    }

    private Address toAddressDomain(OrderRequest.AddressRequest request) {
        if (request == null)
            return null;
        return Address.builder()
                .street(request.getStreet())
                .city(request.getCity())
                .state(request.getState())
                .postalCode(request.getPostalCode())
                .country(request.getCountry())
                .build();
    }

    private Campaign toCampaignDomain(OrderRequest.CampaignRequest request) {
        if (request == null)
            return null;
        return Campaign.builder()
                .utmSource(request.getUtmSource())
                .utmMedium(request.getUtmMedium())
                .utmCampaign(request.getUtmCampaign())
                .reportarId(request.getReportarId())
                .build();
    }

    private Metadata toMetadataDomain(OrderRequest.MetadataRequest request) {
        if (request == null)
            return null;
        return Metadata.builder()
                .googleClientId(request.getGoogleClientId())
                .fbp(request.getFbp())
                .fbc(request.getFbc())
                .userAgent(request.getUserAgent())
                .ipAddress(request.getIpAddress())
                .build();
    }

    public OrderResponse toResponse(Order domain) {
        if (domain == null)
            return null;

        Business biz = domain.getBusiness();
        Person owner = biz != null ? biz.getOwner() : null;
        Plan plan = domain.getPlan();

        return OrderResponse.builder()
                .id(domain.getId())
                .date(domain.getDate())
                .priceTotal(domain.getPriceTotal())
                .status(domain.getStatus() != null ? domain.getStatus().name() : null)
                .statusLabel(domain.getStatus() != null ? domain.getStatus().getLabel() : null)
                .planId(plan != null ? plan.getId() : null)
                .planName(plan != null ? plan.getNombre() : null)
                .businessName(biz != null ? biz.getName() : null)
                .businessActivity(biz != null ? biz.getActivity() : null)
                .businessType(biz != null ? biz.getType() : null)
                .businessState(biz != null ? biz.getState() : null)
                .ownerName(owner != null ? owner.getName() : null)
                .ownerLastName(owner != null ? owner.getLastName() : null)
                .ownerEmail(owner != null ? owner.getEmailAddress() : null)
                .ownerPhone(owner != null ? owner.getPhoneNumber() : null)
                .stripeSessionId(domain.getStripeInvoiceId())
                .generatedPassword(domain.getGeneratedPassword())
                .build();
    }

    // para StripeResponse
    public CheckoutResponseDTO toStripeResponse(Order order) {
        if (order == null) return null;
        CheckoutResponseDTO response = new CheckoutResponseDTO();
        response.setSessionUrl(order.getUrlRecibo()); // La URL larga
        response.setSessionId(order.getStripeInvoiceId()); // El cs_test...
        return response;
    }
}
