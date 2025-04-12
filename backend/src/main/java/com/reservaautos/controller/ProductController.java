package com.reservaautos.controller;

import com.reservaautos.exception.DuplicateEntityException;
import com.reservaautos.model.Product;
import com.reservaautos.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Permitir peticiones desde el frontend en desarrollo
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try {
            Product savedProduct = productService.addProduct(product);
            return ResponseEntity.ok(savedProduct);
        } catch (DuplicateEntityException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Product>> getRandomProducts() {
        List<Product> allProducts = productService.getAllProducts();
        
        if (allProducts.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        
        // Mezclar aleatoriamente la lista
        Collections.shuffle(allProducts);
        
        // Tomar máximo 10 productos
        List<Product> randomProducts = allProducts.size() > 10 
            ? allProducts.subList(0, 10) 
            : allProducts;
            
        return ResponseEntity.ok(randomProducts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
} 