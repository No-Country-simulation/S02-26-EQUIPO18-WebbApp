package com.nocountry.ecommerce.domain.model;

public enum RegistrationStatus {
    PENDIENTE(0, "Pendiente de aprobacion"),
    PAGADO(1, "Pago aceptado"),
    CANCELADO(2, "Pedido cancelado"),
    FACTURADO(3, "Facturado"),
    PENDIENTE_ENVIO(4, "Pendiente de envio"),
    DISTRIBUCION_INTERNA(5, "Listo para distribucion interna"),
    LISTO_ENVIAR(6, "Listo para enviar"),
    EN_TRANSITO(7, "En transito"),
    LISTO_RECOJO(8, "Listo para recojo"),
    ENTREGADO(9, "Entregado"),
    ANULADO(10, "Anulacion de operacion"),
    RECHAZADO(11, "Rechazado");

    private final int code;
    private final String label;

    RegistrationStatus(int code, String label) {
        this.code = code;
        this.label = label;
    }

    public int getCode() { return code; }
    public String getLabel() { return label; }

    public static RegistrationStatus fromCode(int code) {
        for (RegistrationStatus s : values()) {
            if (s.code == code) return s;
        }
        throw new IllegalArgumentException("Status code no valido: " + code);
    }
}
