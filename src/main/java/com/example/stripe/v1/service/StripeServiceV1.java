package com.example.stripe.v1.service;

import com.example.stripe.v1.dto.ProductRequest;
import com.example.stripe.v1.dto.CheckoutResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Service
public class StripeServiceV1 {
    //StripeApi necesita -> productName, amount, quantity, currency
    //Stripe return sessionId and Url

    @Value("${stripe.api.key}")
    private String secretKet;

    public CheckoutResponse checkoutProducts(ProductRequest productRequest){
        //Lo utilizamos para lograr conectarnos a nuestra cuenta de stripe
        Stripe.apiKey = secretKet;

        //Setteamos el nombre del producto para stripe
        SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams
                .LineItem.PriceData.ProductData.builder()
                .setName(productRequest.getProductName()).build();

        //Setteamos el precio y la cantidad de $$ del producto para stripe
        SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams
                .LineItem.PriceData.builder()
                .setCurrency(productRequest.getCurrency()==null?"USD": productRequest.getCurrency())
                .setUnitAmount(productRequest.getAmount())
                .setProductData(productData)
                .build();

        //Setteamos la cantidad de items del producto
        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(productRequest.getQuantity())
                .setPriceData(priceData)
                .build();

        //Construimos los parámtros de la sesion
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:8080/success")
                .setCancelUrl("http://localhost:8080/cancel")
                .addLineItem(lineItem)
                .build();

        //Creamos una session
        try {
            Session session = Session.create(params);

            return CheckoutResponse.builder()
                    .status("SUCCESS")
                    .message("Payment session created")
                    .sessionId(session.getId())
                    .sessionUrl(session.getUrl())
                    .build();

        } catch (StripeException e){
            return CheckoutResponse.builder()
                    .status("ERROR")
                    .message(e.getMessage())
                    .build();
        }
    }
}
