package com.reservaautos.controller;

import com.reservaautos.model.Auto;
import com.reservaautos.service.AutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autos")
public class AutoController {
    
    @Autowired
    private AutoService autoService;
    
    @GetMapping
    public List<Auto> listarAutos() {
        return autoService.listarAutos();
    }
    
    @PostMapping
    public Auto crearAuto(@RequestBody Auto auto) {
        return autoService.guardarAuto(auto);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Auto> obtenerAuto(@PathVariable Long id) {
        Auto auto = autoService.obtenerAutoPorId(id);
        if (auto != null) {
            return ResponseEntity.ok(auto);
        }
        return ResponseEntity.notFound().build();
    }
} 