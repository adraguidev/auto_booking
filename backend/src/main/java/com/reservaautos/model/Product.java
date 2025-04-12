package com.reservaautos.model;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El nombre del producto es obligatorio")
    @Column(unique = true)
    private String name;
    
    @NotBlank(message = "La descripción del producto es obligatoria")
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotBlank(message = "La URL de la imagen es obligatoria")
    private String imageUrl;
    
    private String location;
    
    // Constructor sin argumentos requerido por JPA
    public Product() {
    }
    
    // Constructor con campos obligatorios
    public Product(String name, String description, String imageUrl) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
} 