package com.reservaautos.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "autos")
public class Auto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String marca;
    private String modelo;
    private String placa;
    private boolean disponible;
} 