package com.example.stripe.v1.service;

import com.example.stripe.v1.dto.ConversionData;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class GoogleAnalyticsService {

    private final WebClient webClient;
    private final Gson gson;

    @Value("${google.measurement.id}")
    private String measurementId;

    @Value("${google.api.secret}")
    private String apiSecret;

    public GoogleAnalyticsService(Gson gson) {
        this.webClient = WebClient.builder()
                .baseUrl("https://www.google-analytics.com")
                .build();
        this.gson = new Gson();
    }

    public void sendPurchaseEvent(ConversionData data) {
        // Estructura para GA4
        try {
            // Construir payload para Google
            Map<String, Object> payload  = buildConversion(data);

            String jsonPayload = gson.toJson(payload);

            log.info("========================================");
            log.info("Enviando evento a Google Analytics 4");
            log.info("Measurement ID: {}", measurementId);
            log.info("Payload: {}", jsonPayload);
            log.info("========================================");

            // Enviar a Google
            String response = webClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/mp/collect")
                            .queryParam("measurement_id", measurementId)
                            .queryParam("api_secret", apiSecret)
                            .build())
                    .header("Content-Type", "application/json")
                    .bodyValue(jsonPayload)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            log.info("Google Ads response: {}", response);

        } catch (Exception e) {
            log.error("Error enviando conversión a Google: {}", e.getMessage(), e);
        }
    }

    private Map<String, Object> buildConversion(ConversionData data) {
        Map<String, Object> payload = new HashMap<>();

        // En producción, esto vendría del frontend (_ga cookie)
        // Para testing, usamos el email hasheado
        /*String clientId = data.getEmail() != null
                ? String.valueOf(data.getEmail().hashCode())
                : "anonymous";*/
        String clientId = "99999.88888";
        payload.put("client_id", clientId);

        // Timestamp del evento (en microsegundos)
        payload.put("timestamp_micros", data.getEventTime() * 1000);

        // El evento
        Map<String, Object> event = new HashMap<>();
        event.put("name", "purchase");  // Nombre del evento estándar

        // Parámetros del evento
        Map<String, Object> params = new HashMap<>();
        params.put("debug_mode", 1);
        params.put("currency", data.getCurrency());
        params.put("value", data.getValue());
        params.put("transaction_id", data.getEventId());

        // Items (productos comprados)
        Map<String, Object> item = new HashMap<>();
        item.put("item_id", "llc_incorporation");
        item.put("item_name", "LLC Incorporation Service");
        item.put("price", data.getValue());
        item.put("quantity", 1);

        params.put("items", List.of(item));

        // Datos de usuario para enhanced measurement
        if (data.getEmail() != null) {
            Map<String, Object> userProperties = new HashMap<>();
            userProperties.put("user_id", Map.of("value", data.getEmail()));
            payload.put("user_properties", userProperties);
            log.info("Email incluido como user_id: {}", data.getEmail());
        }

        event.put("params", params);
        payload.put("events", List.of(event));

        return payload;
    }
}
