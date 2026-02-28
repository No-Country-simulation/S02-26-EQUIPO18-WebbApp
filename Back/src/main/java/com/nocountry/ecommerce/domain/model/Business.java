package com.nocountry.ecommerce.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Business {
    private Long id;
    private String name;
    private String activity;
    private String type;
    private String state;
    private Person owner;
    private Address address;
}
