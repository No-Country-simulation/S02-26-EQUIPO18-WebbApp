package com.nocountry.ecommerce.infrastructure.adapter.input.rest;

import com.nocountry.ecommerce.domain.model.VisitorEvent;
import com.nocountry.ecommerce.domain.ports.out.VisitorEventRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/visitors")
@RequiredArgsConstructor
public class VisitorController {

    private final VisitorEventRepositoryPort visitorEventRepo;

    /**
     * Recibe eventos de tracking desde el frontend.
     * POST /api/v1/visitors/events
     */
    @PostMapping("/events")
    public ResponseEntity<Map<String, String>> trackEvent(@RequestBody Map<String, Object> body) {
        String extra = null;
        Object extraObj = body.get("extra");
        if (extraObj instanceof Map) {
            // Serializar el extra como JSON string
            StringBuilder sb = new StringBuilder("{");
            @SuppressWarnings("unchecked")
            Map<String, String> extraMap = (Map<String, String>) extraObj;
            extraMap.forEach((k, v) -> sb.append("\"").append(k).append("\":\"").append(v).append("\","));
            if (sb.length() > 1)
                sb.setLength(sb.length() - 1);
            sb.append("}");
            extra = sb.toString();
        }

        VisitorEvent event = VisitorEvent.builder()
                .visitorUid(getStr(body, "visitor_uid"))
                .sessionId(getStr(body, "session_id"))
                .event(getStr(body, "event"))
                .page(getStr(body, "page"))
                .referrer(getStr(body, "referrer"))
                .utmSource(getStr(body, "utm_source"))
                .utmMedium(getStr(body, "utm_medium"))
                .utmCampaign(getStr(body, "utm_campaign"))
                .ipAddress(getStr(body, "ip_address"))
                .userAgent(getStr(body, "user_agent"))
                .extra(extra)
                .createdAt(LocalDateTime.now())
                .build();

        visitorEventRepo.save(event);
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    /**
     * Obtiene todos los eventos (para el dashboard admin).
     * GET /api/v1/visitors/events
     */
    @GetMapping("/events")
    public ResponseEntity<List<VisitorEvent>> getAllEvents() {
        return ResponseEntity.ok(visitorEventRepo.findAll());
    }

    /**
     * Obtiene eventos de un visitante especifico.
     * GET /api/v1/visitors/{uid}/events
     */
    @GetMapping("/{uid}/events")
    public ResponseEntity<List<VisitorEvent>> getEventsByVisitor(@PathVariable String uid) {
        return ResponseEntity.ok(visitorEventRepo.findByVisitorUid(uid));
    }

    private String getStr(Map<String, Object> map, String key) {
        Object val = map.get(key);
        return val != null ? val.toString() : "";
    }
}
