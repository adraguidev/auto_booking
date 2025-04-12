package com.reservaautos.service;

import com.reservaautos.model.Auto;
import com.reservaautos.repository.AutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutoService {
    
    @Autowired
    private AutoRepository autoRepository;
    
    public List<Auto> listarAutos() {
        return autoRepository.findAll();
    }
    
    public Auto guardarAuto(Auto auto) {
        return autoRepository.save(auto);
    }
    
    public Auto obtenerAutoPorId(Long id) {
        return autoRepository.findById(id).orElse(null);
    }
} 