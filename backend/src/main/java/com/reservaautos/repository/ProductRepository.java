package com.reservaautos.repository;

import com.reservaautos.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    /**
     * Busca un producto por su nombre exacto
     * @param name Nombre del producto a buscar
     * @return Optional con el producto encontrado o vacío
     */
    Optional<Product> findByName(String name);
} 