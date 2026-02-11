package com.nocountry.ecommerce.domain.model;

public enum USAState {
    WYOMING("Wyoming"),
    DELAWARE("Delaware"),
    NEW_MEXICO("New Mexico"),
    FLORIDA("Florida"),
    TEXAS("Texas");

    private final String label;

    USAState(String label) {
        this.label = label;
    }

    @com.fasterxml.jackson.annotation.JsonValue
    public String getLabel() {
        return label;
    }

    @com.fasterxml.jackson.annotation.JsonCreator
    public static USAState fromString(String text) {
        for (USAState b : USAState.values()) {
            if (b.label.equalsIgnoreCase(text)) {
                return b;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }
}
