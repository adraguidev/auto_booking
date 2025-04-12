#!/bin/bash

# Definir la URL base
BASE_URL="http://localhost:8080/api"

echo "Iniciando pruebas de la API de productos..."

# Crear un nuevo producto
echo "\n1. Creando un nuevo producto..."
curl -X POST "${BASE_URL}/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Auto Modelo X",
    "description": "Sedán 4 puertas",
    "imageUrl": "http://ejemplo.com/imagen1.jpg",
    "location": "Lima"
  }' | json_pp

# Intentar crear un producto duplicado (debería fallar)
echo "\n\n2. Intentando crear un producto duplicado (debería dar error 400)..."
curl -X POST "${BASE_URL}/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Auto Modelo X",
    "description": "Otro sedán",
    "imageUrl": "http://ejemplo.com/imagen2.jpg",
    "location": "Lima"
  }' | json_pp

# Obtener lista de productos
echo "\n\n3. Obteniendo lista de productos..."
curl "${BASE_URL}/products" | json_pp

# Obtener un producto específico
echo "\n\n4. Obteniendo producto con ID 1..."
curl "${BASE_URL}/products/1" | json_pp

# Eliminar un producto
echo "\n\n5. Eliminando producto con ID 1..."
curl -X DELETE "${BASE_URL}/products/1" -v

# Verificar que el producto fue eliminado
echo "\n\n6. Verificando que el producto fue eliminado (debería dar 404)..."
curl "${BASE_URL}/products/1" -v

echo "\n\nPruebas completadas."
