# Desafío Performance - Banca Ecuador

Pruebas de rendimiento usando K6 sobre la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## ¿Qué hace este proyecto?

Ejecuta pruebas de carga simulando múltiples usuarios concurrentes sobre 3 endpoints:

1. GET - Obtener lista de posts
2. GET - Obtener un post por ID
3. POST - Crear un post nuevo

## Requisitos

- [K6](https://k6.io/docs/get-started/installation/) instalado


## Cómo ejecutar

### Ejecución estándar
```bash
k6 run script.js
```

### Ejecución con dashboard visual en tiempo real
```bash
K6_WEB_DASHBOARD=true k6 run script.js
```
Luego abrir en el browser: `http://localhost:5665`

### Ejecución con reporte HTML exportado
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=reporte.html k6 run script.js
```
El reporte queda en `reporte.html` en la misma carpeta.

## Configuración de carga

```
Usuarios
   5 |       ________
     |      /        \
     |     /          \
   0 |____/            \____
     0s  10s    30s    40s
```

- **Rampa de subida**: 0 → 5 usuarios en 10s
- **Carga sostenida**: 5 usuarios por 20s
- **Rampa de bajada**: 5 → 0 usuarios en 10s

## Umbrales de éxito

| Métrica | Umbral |
|---|---|
| Tiempo de respuesta p(95) | < 2000ms |
| Tasa de errores | < 1% |

## Datos de prueba

Los datos están parametrizados en `datos.json`:

## Estructura del proyecto

```
desafio-performance/
├── script.js    ← Script principal de K6
├── datos.json   ← Datos parametrizados
└── README.md
```

## Resultados esperados

```
✓ GET posts - status 200
✓ GET posts - tiene datos
✓ GET post - status 200
✓ GET post - id correcto
✓ POST crear - status 201
✓ POST crear - titulo correcto

✓ p(95) < 2000ms
✓ rate < 0.01
```
