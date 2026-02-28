package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.ConversionDataDTO;

public interface MarketingPort {
    void sendPurchaseEvent(ConversionDataDTO dataDTO);
}
