package com.nocountry.ecommerce.infrastructure.adapter.input.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String welcome() {
        return "<html>" +
                "<head><style>" +
                "body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f0f4f8; }"
                +
                ".container { text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }"
                +
                "h1 { color: #2d3748; }" +
                "p { color: #4a5568; }" +
                ".links { margin-top: 1.5rem; }" +
                "a { display: inline-block; margin: 0.5rem; padding: 0.75rem 1.5rem; background: #3182ce; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; transition: background 0.2s; }"
                +
                "a:hover { background: #2b6cb0; }" +
                "a.secondary { background: #4a5568; }" +
                "a.secondary:hover { background: #2d3748; }" +
                "</style></head>" +
                "<body>" +
                "<div class='container'>" +
                "<h1>🚀 Backend de E-commerce Iniciado</h1>" +
                "<p>El servidor está funcionando correctamente. Esta es una <b>API REST</b>.</p>" +
                "<p>Para interactuar con el sistema, utiliza uno de los siguientes enlaces:</p>" +
                "<div class='links'>" +
                "<a href='/swagger-ui/index.html'>📖 Ver Documentación API (Swagger)</a>" +
                "<a href='/h2-console' class='secondary'>🗄️ Consola Base de Datos (H2)</a>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}
