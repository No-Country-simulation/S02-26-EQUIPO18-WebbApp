package com.example.stripe.v1.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct //Se ejecuta automaticamente cuando Spring inicia
    public void init(){
        //Configuramos globalmente el SDK del API KEY de Stripe
        Stripe.apiKey = stripeApiKey;
    }
}
