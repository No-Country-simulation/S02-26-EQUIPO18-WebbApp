package com.nocountry.ecommerce.infrastructure.adapter.output.marketing;

import com.google.gson.Gson;
import com.nocountry.ecommerce.domain.model.ConversionDataDTO;
import com.nocountry.ecommerce.domain.ports.out.MarketingPort;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class GoogleAnalitycsAdapter implements MarketingPort {


    private final WebClient webClient;
    private final Gson gson;

    @Value("${google.measurement.id}")
    private String measurementId;

    @Value("${google.api.secret}")
    private String apiSecret;

    public GoogleAnalitycsAdapter(Gson gson) {
        log.info("========================================");
        log.info("Google GA4 Adapter CREADO");
        log.info("========================================");
        this.webClient = WebClient.builder()
                .baseUrl("https://www.google-analytics.com") // para producción
                .build();
        this.gson = new Gson();
    }

    @Override
    public void sendPurchaseEvent(ConversionDataDTO dataDTO) {
        try {
            log.info("Google GA4: Enviando envento de compara para {}", dataDTO.getEmail());

            // Construir payload para Google
            Map<String, Object> payload  = buildConversion(dataDTO);

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
        }catch (Exception e){
            log.error("Error enviando conversión a Google: {}", e.getMessage(), e);
        }
    }

    private Map<String, Object> buildConversion(ConversionDataDTO dataDTO) {
        Map<String, Object> payload = new HashMap<>();

        // En producción, esto vendría del frontend (_ga cookie)
        payload.put("client_id", dataDTO.getClientId() != null ? dataDTO.getClientId() : "anonymous");

        // Timestamp del evento (en microsegundos)
        payload.put("timestamp_micros", dataDTO.getEventTime() * 1000000L);

        // El evento
        Map<String, Object> event = new HashMap<>();
        event.put("name", "purchase");  // Nombre del evento estándar

        // Parámetros del evento
        Map<String, Object> params = new HashMap<>();
        params.put("debug_mode", 1);
        params.put("currency", dataDTO.getCurrency().toUpperCase());
        params.put("value", dataDTO.getValue());
        params.put("transaction_id", dataDTO.getEventId());

        // Items (productos comprados)
        Map<String, Object> item = new HashMap<>();
        item.put("item_id", "llc_incorporation");
        item.put("item_name", "LLC Incorporation Service");
        item.put("price", dataDTO.getValue());
        item.put("quantity", 1);

        params.put("items", List.of(item));
        event.put("params", params);
        payload.put("events", List.of(event));

        return payload;
    }
}
