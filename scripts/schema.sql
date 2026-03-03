-- ===========================================================================
-- Total Incorporation - esquema de base de datos (PostgreSQL)
-- ejecutar sobre la db: total_incorporation
-- ===========================================================================

-- limpiar las tablas si ya existen (solo para desarrollo)
DROP TABLE IF EXISTS buy_orders CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS visitor_events CASCADE;
DROP TABLE IF EXISTS visitors CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS persons CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS metadata CASCADE;
DROP TABLE IF EXISTS plans CASCADE;

-- ===================
-- planes de servicio
-- ===================
CREATE TABLE plans (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    beneficios TEXT[] -- array nativo de postgres
);

-- datos iniciales
INSERT INTO plans (id, nombre, costo, beneficios) VALUES
('Inicial_Basico', 'Plan Inicial', 499.00, ARRAY[
    'Registro de LLC o C-Corp',
    'Solicitud de EIN en el IRS',
    'Documentos post formacion',
    'Agente Registrado',
    'Direccion Virtual',
    'Calendario de Cumplimiento'
]),
('Crecimiento_Pro', 'Plan Crecimiento', 899.00, ARRAY[
    'Todo lo incluido en el Plan Inicio',
    '+ Asistencia Fiscal',
    '+ Informe Anual (Renovacion estatal)',
    '+ Declaracion de impuestos estatal'
]),
('Elite_Premium', 'Plan Elite', 4499.00, ARRAY[
    'Todo lo incluido en el Plan Crecimiento',
    'Asistencia fiscal completa y llamadas ilimitadas con expertos',
    'Contabilidad diaria (Limite de gastos: $50,000/mes)',
    'Impuesto sobre las Ventas/Reventa, Solicitud y Devolucion de Impuestos.'
]);

-- ===================
-- direcciones
-- ===================
CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'US'
);

-- ===================
-- personas (datos del dueno)
-- ===================
CREATE TABLE persons (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30),
    email_address VARCHAR(255) NOT NULL,
    address_id BIGINT REFERENCES addresses(id)
);

-- ===================
-- usuarios (credenciales)
-- ===================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    person_id BIGINT REFERENCES persons(id),
    user_name VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) DEFAULT 'ROLE_USER',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- admin por defecto (password: password123 - bcrypt)
-- se genera por el DataInitializer de spring boot, no hace falta insertarlo aqui

-- ===================
-- negocios / empresas
-- ===================
CREATE TABLE businesses (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    activity TEXT,
    type VARCHAR(20), -- LLC o CORP
    state VARCHAR(50),
    owner_id BIGINT REFERENCES persons(id),
    address_id BIGINT REFERENCES addresses(id)
);

-- ===================
-- campanas de marketing
-- ===================
CREATE TABLE campaigns (
    id BIGSERIAL PRIMARY KEY,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(255),
    reportar_id VARCHAR(255),
    gclid VARCHAR(255),
    fbclid VARCHAR(255)
);

-- ===================
-- metadata de tracking
-- ===================
CREATE TABLE metadata (
    id BIGSERIAL PRIMARY KEY,
    google_client_id VARCHAR(255),
    fbp VARCHAR(255),
    fbc VARCHAR(255),
    user_agent TEXT,
    ip_address VARCHAR(50)
);

-- ===================
-- ordenes (formulario completado)
-- ===================
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    plan_id VARCHAR(50) REFERENCES plans(id),
    price_total DECIMAL(10, 2),
    business_id BIGINT REFERENCES businesses(id),
    campaign_id BIGINT REFERENCES campaigns(id),
    metadata_id BIGINT REFERENCES metadata(id),
    stripe_invoice_id VARCHAR(255),
    url_recibo TEXT,
    status VARCHAR(50) DEFAULT 'PENDIENTE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================
-- ordenes de compra (pagos en stripe)
-- esta tabla registra cada intento de pago, exitoso o fallido
-- ===================
CREATE TABLE buy_orders (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id),
    stripe_session_id VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    amount DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    status VARCHAR(50) NOT NULL DEFAULT '0',
    -- estados:
    -- 0  = pendiente de aprobacion
    -- 1  = pago aceptado
    -- 2  = pedido cancelado
    -- 3  = facturado
    -- 4  = pendiente de envio
    -- 5  = listo para distribucion interna
    -- 6  = listo para enviar
    -- 7  = en transito
    -- 8  = listo para recojo
    -- 9  = entregado
    -- 10 = anulacion de operacion
    -- 11 = rechazado
    customer_email VARCHAR(255),
    customer_name VARCHAR(255),
    payment_method VARCHAR(100),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================
-- visitantes unicos (para analytics)
-- ===================
CREATE TABLE visitors (
    id BIGSERIAL PRIMARY KEY,
    visitor_uid VARCHAR(100) UNIQUE NOT NULL, -- id aleatorio guardado en localStorage
    country VARCHAR(100),
    city VARCHAR(100),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(255),
    referrer TEXT,
    user_agent TEXT,
    ip_address VARCHAR(50),
    first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_visits INTEGER DEFAULT 1,
    has_purchased BOOLEAN DEFAULT false
);

-- ===================
-- eventos de visitantes (interacciones)
-- ===================
CREATE TABLE visitor_events (
    id BIGSERIAL PRIMARY KEY,
    visitor_id BIGINT REFERENCES visitors(id),
    event_type VARCHAR(50) NOT NULL,
    -- tipos posibles: page_view, click_navbar, click_plan, click_login,
    -- form_step_1, form_step_2, form_step_3, form_submit, footer_click,
    -- whatsapp_click, faq_open, scroll_pricing, etc.
    page VARCHAR(100),
    element VARCHAR(100), -- que elemento toco
    extra_data JSONB, -- datos extras flexibles (plan seleccionado, paso del form, etc)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================
-- indices para reportes
-- ===================
CREATE INDEX idx_visitors_country ON visitors(country);
CREATE INDEX idx_visitors_utm_source ON visitors(utm_source);
CREATE INDEX idx_visitors_utm_campaign ON visitors(utm_campaign);
CREATE INDEX idx_visitors_created ON visitors(first_visit);
CREATE INDEX idx_visitor_events_type ON visitor_events(event_type);
CREATE INDEX idx_visitor_events_created ON visitor_events(created_at);
CREATE INDEX idx_visitor_events_visitor ON visitor_events(visitor_id);
CREATE INDEX idx_buy_orders_status ON buy_orders(status);
CREATE INDEX idx_buy_orders_order ON buy_orders(order_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(date);

-- ===================
-- vista para reportes de visitantes agrupados por pais
-- ===================
CREATE OR REPLACE VIEW visitor_stats_by_country AS
SELECT 
    country,
    COUNT(*) as total_visitors,
    COUNT(CASE WHEN has_purchased THEN 1 END) as purchasers,
    MIN(first_visit) as earliest_visit,
    MAX(last_visit) as latest_visit
FROM visitors
GROUP BY country
ORDER BY total_visitors DESC;

-- ===================
-- vista para reportes de campanas
-- ===================
CREATE OR REPLACE VIEW campaign_stats AS
SELECT
    utm_campaign,
    utm_source,
    utm_medium,
    COUNT(*) as total_visitors,
    COUNT(CASE WHEN has_purchased THEN 1 END) as conversions,
    ROUND(
        COUNT(CASE WHEN has_purchased THEN 1 END)::DECIMAL / NULLIF(COUNT(*), 0) * 100, 2
    ) as conversion_rate
FROM visitors
WHERE utm_campaign IS NOT NULL
GROUP BY utm_campaign, utm_source, utm_medium
ORDER BY total_visitors DESC;

-- ===================
-- vista para ventas por estado
-- ===================
CREATE OR REPLACE VIEW sales_by_status AS
SELECT
    status,
    COUNT(*) as total,
    SUM(amount) as total_amount,
    DATE_TRUNC('day', created_at) as day
FROM buy_orders
GROUP BY status, DATE_TRUNC('day', created_at)
ORDER BY day DESC;
