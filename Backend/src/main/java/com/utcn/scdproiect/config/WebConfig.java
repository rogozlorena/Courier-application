package com.utcn.scdproiect.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean  // Adaugă această adnotare pentru a marca metoda ca fiind un bean Spring
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Permite cererile către toate endpoint-urile
                        .allowedOrigins("http://localhost:3000", "http://localhost")  // Permite cererile de la frontend-ul React si client Descktop
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Permite cererile GET, POST, PUT, DELETE, OPTIONS
                        .allowedHeaders("*")  // Permite toate headerele
                        .allowCredentials(true);  // Permite cookie-uri și autentificare
            }
        };
    }
}
