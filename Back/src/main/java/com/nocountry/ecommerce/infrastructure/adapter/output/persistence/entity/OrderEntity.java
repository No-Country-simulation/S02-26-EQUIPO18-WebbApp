package com.nocountry.ecommerce.infrastructure.adapter.output.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private PlanEntity plan;

    @Column(name = "price_total")
    private BigDecimal priceTotal;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "metadata_id")
    private MetadataEntity metadata;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "campaign_id")
    private CampaignEntity campaign;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "business_id")
    private BusinessEntity business;

    @Column(name = "stripe_invoice_id", length = 500)
    private String stripeInvoiceId;

    @Column(name = "url_recibo", columnDefinition = "TEXT")
    private String urlRecibo;

    @Enumerated(EnumType.STRING)
    private com.nocountry.ecommerce.domain.model.RegistrationStatus status;
}
