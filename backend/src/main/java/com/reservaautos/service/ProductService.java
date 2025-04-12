package com.reservaautos.service;

import com.reservaautos.exception.DuplicateEntityException;
import com.reservaautos.model.Product;
import com.reservaautos.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    /**
     * Agrega un nuevo producto al sistema
     * @param newProduct El producto a agregar
     * @return El producto guardado
     * @throws DuplicateEntityException Si ya existe un producto con el mismo nombre
     */
    public Product addProduct(Product newProduct) {
        // Verificar si ya existe un producto con el mismo nombre
        productRepository.findByName(newProduct.getName())
            .ifPresent(existingProduct -> {
                throw new DuplicateEntityException(
                    String.format("El producto '%s' ya existe en el sistema", newProduct.getName())
                );
            });
        
        return productRepository.save(newProduct);
    }
    
    /**
     * Obtiene todos los productos del sistema
     * @return Lista de todos los productos
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    /**
     * Obtiene un producto por su ID
     * @param id ID del producto a buscar
     * @return El producto encontrado o null si no existe
     */
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    
    /**
     * Elimina un producto por su ID
     * @param id ID del producto a eliminar
     */
    public void deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        }
    }
} 