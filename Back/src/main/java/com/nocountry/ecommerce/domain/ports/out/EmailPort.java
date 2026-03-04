package com.nocountry.ecommerce.domain.ports.out;

import com.nocountry.ecommerce.domain.model.Order;

public interface EmailPort {
    void sendPurchaseConfirmation(String to,
                                  String subject,
                                  String amount,
                                  String currency);
    //Método para registro de usuarios
    void sendWelcomeEmail(String to,
                          String customerName, Order order);
}
