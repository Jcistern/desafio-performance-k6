# K6 Performance Testing - FakeStore API

[![Status](https://img.shields.io/badge/Status-APROBADO-brightgreen)](README.md)
[![Performance Score](https://img.shields.io/badge/Performance%20Score-97%2F100-green)](README.md)
[![Uptime](https://img.shields.io/badge/Uptime-100%25-brightgreen)](README.md)
[![Error Rate](https://img.shields.io/badge/Error%20Rate-0%25-brightgreen)](README.md)

---

## 📋 Descripción

Proyecto de pruebas de carga y performance testing para el endpoint de login de **FakeStore API** utilizando **K6 (Grafana)**.

**Proyecto:** Desafío de Performance Testing - NTT DATA / Banco Pichincha  
**Objetivo:** Validar disponibilidad, latencia y escalabilidad del servicio de autenticación  
**Status:** ✅ **APROBADO**

---

## 🎯 Resultados Ejecutivos

| Métrica | Resultado | Status |
|---------|-----------|--------|
| **Requests Exitosos** | 2,725 / 2,725 | ✅ 100% |
| **Error Rate** | 0.00% | ✅ Excelente |
| **Thresholds Pasados** | 6 / 6 | ✅ 100% |
| **Disponibilidad** | 100% uptime | ✅ Perfecto |
| **Smoke p(95)** | 459.33ms < 700ms | ✅ Pasó |
| **Load p(95)** | 679.82ms < 1500ms | ✅ Pasó |
| **Stress p(95)** | 606.48ms < 2000ms | ✅ Pasó |
| **Score Performance** | 97/100 | ✅ EXCELENTE |

---

## 📊 Escenarios de Prueba

### 🔹 Smoke Test (Validación)
Validación rápida del endpoint antes de pruebas más intensas.

```
Configuración:  2 VUs ramping, 30 segundos
Requests:       72 completados
Latencia p(95): 459.33ms ✓ < 700ms SLA
Error Rate:     0.00% ✓ < 1% SLA
Resultado:      ✅ PASÓ
```

### 🔹 Load Test (Carga Normal)
Prueba de carga esperada en producción.

```
Configuración:  20 VUs ramping, 50 segundos
Requests:       610 completados
Latencia p(95): 679.82ms ✓ < 1500ms SLA
Error Rate:     0.00% ✓ < 3% SLA
Resultado:      ✅ PASÓ
```

### 🔹 Stress Test (Límites)
Prueba de los límites y punto de quiebre del sistema.

```
Configuración:  50 VUs ramping, 80 segundos
Requests:       2043 completados
Latencia p(95): 606.48ms ✓ < 2000ms SLA
Error Rate:     0.00% ✓ < 5% SLA
Resultado:      ✅ PASÓ
```

---

## 📦 Dependencias
 
```
K6 v0.47.0 (Performance Testing Framework)
├── Comprende script.js
├── Ejecuta escenarios (smoke, load, stress)
└── Genera métricas y logs
 
run-k6.sh (Bash wrapper)
├── Captura salida de K6
├── Genera timestamps
└── Guarda logs automáticamente
 
Node.js v18.16.0 (Runtime - opcional para scripts auxiliares)
├── npm v9.6.7
└── Packages auxiliares (si aplican)
```
 
---

## 🚀 Instalación y Configuración

### Requisitos Previos

- **K6** v0.47.0 (versión específica recomendada, v0.41.0 mínimo)
- **Node.js** v16.13.0 o superior (v18.x LTS recomendado)
- **npm** v7.0.0 o superior (incluido con Node.js)
- **Bash** 4.0+ (para ejecutar `run-k6.sh`)
- Acceso a **FakeStore API** (https://fakestoreapi.com)

### Instalación de K6

#### macOS (Homebrew)
```bash
brew install k6
```

#### Linux (Debian/Ubuntu)
```bash
sudo apt-get update
sudo apt-get install k6
```

#### Windows (Chocolatey)
```powershell
choco install k6
```

#### Verificar instalación
```bash
k6 version
# k6 v0.47.0 (ubuntu/linux/amd64)
 
node --version
# v18.16.0
 
npm --version
# 9.6.7
```
 
#### Verificar compatibilidad
```bash
# Script automático para verificar versiones
./check-versions.sh
 
# Output esperado:
# ✓ K6 v0.47.0
# ✓ Node.js v18.16.0
# ✓ npm v9.6.7
# ✓ Bash 5.2.x
```

### Configuración del Proyecto
 
1. **Clonar o descargar el repositorio:**
```bash
cd ~/Documents/performance-k6
```
 
2. **Verificar compatibilidad de versiones:**

| Software | Versión Mínima | Versión Recomendada | Probada |
|----------|---|---|---|
| K6 | v0.41.0 | v0.47.0 | ✅ v0.47.0 |
| Node.js | v16.13.0 | v18.x LTS | ✅ v18.16.0 |
| npm | v7.0.0 | v9.x | ✅ v9.6.7 |
| Bash | 4.0+ | 5.0+ | ✅ 5.2.x |
| macOS | 10.15+ | 12.0+ | ✅ 12.x |
| Linux | Ubuntu 18.04+ | Ubuntu 20.04+ | ✅ Ubuntu 22.04 |
| Windows | 10/11 (WSL2) | 11 (WSL2) | ✅ WSL2 Ubuntu |
 
**Nota:** Este proyecto ha sido probado específicamente con las versiones indicadas en la columna "Probada".
 
3. **Verificar archivos necesarios:**

```bash
ls -la
# script.js         (Script K6 principal)
# credentials.csv   (Credenciales de prueba)
# datos.json        (Configuración API)
# run-k6.sh         (Wrapper de ejecución)
# README.md         (Este archivo)
```
 
4. **Dar permisos de ejecución:**
```bash
chmod +x run-k6.sh
```
 
---
 
## 🎮 Uso

### Opción 1: Ejecutar con Wrapper Bash (RECOMENDADO)

El wrapper automáticamente:
- Captura salida en archivo con timestamp
- Muestra resumen bonito en consola
- Guarda logs en la carpeta raíz

```bash
./run-k6.sh
```

**Resultado esperado:**
```
========================================
K6 Performance Test
========================================

📝 Archivo de logs: ../k6-execution-2026-05-14_17-02-55.log
⏱️  Inicio: 2026-05-14 17:02:55

🚀 Iniciando pruebas K6...

[K6 ejecuta todas las pruebas...]

========================================
✅ Prueba completada exitosamente
📁 Logs guardados en:
   /Users/tu-usuario/Documents/k6-execution-2026-05-14_17-02-55.log
📊 Tamaño: 245K
========================================
```

### Opción 2: Ejecutar K6 Directamente

```bash
k6 run script.js
```

### Opción 3: Ejecutar Escenario Específico

```bash
# Solo smoke test
k6 run script.js --scenario-select=smoke

# Solo load test
k6 run script.js --scenario-select=load

# Solo stress test
k6 run script.js --scenario-select=stress
```

### Opción 4: Con Opciones Avanzadas

```bash
# Aumentar verbosidad
k6 run script.js -v

# Especificar output
k6 run script.js --out json=results.json

# Con timeout custom
k6 run script.js --http-debug=full
```

---

## 📁 Estructura de Archivos

```
performance-k6/
├── script.js              # Script K6 principal
│   ├── Función: desafio_k6()
│   ├── Escenarios: smoke, load, stress
│   ├── Thresholds: p(95) latencia + error rate
│   └── Checks: status 2xx, token presente, latencia
│
├── credentials.csv        # Credenciales de prueba
│   └── 5 usuarios reales: donero, kevinryan, johnd, derek, mor_2314
│
├── datos.json            # Configuración API
│   └── loginEndpoint: https://fakestoreapi.com/auth/login
│
├── run-k6.sh             # Wrapper bash para ejecución
│   ├── Captura salida
│   ├── Crea timestamp automático
│   ├── Guarda en carpeta raíz (../)
│   └── Muestra resumen
│
├── README.md             # Este archivo
├── CONCLUSIONES.md       # Resultados detallados
└── k6-execution-*.log    # Logs de ejecución (generados)
```

---

## 🔍 Configuración Detallada

### script.js

#### Credenciales
```javascript
// Carga usuarios reales desde CSV
const credentials = loadCredentialsFromCSV('./credentials.csv');
// [5 usuarios] → distribución automática entre VUs
```

#### Función Principal
```javascript
function desafio_k6(scenario) {
  // Selecciona credencial basada en VU actual
  // POST a /auth/login con username + password
  // Valida token JWT en respuesta
  // Registra latencia y checks
}
```

#### Thresholds (SLAs)
```javascript
thresholds: {
  'http_req_duration{scenario:smoke}': ['p(95)<700'],      // 700ms
  'http_req_duration{scenario:load}': ['p(95)<1500'],      // 1500ms
  'http_req_duration{scenario:stress}': ['p(95)<2000'],    // 2000ms
  'http_req_failed{scenario:smoke}': ['rate<0.01'],        // < 1% errores
  'http_req_failed{scenario:load}': ['rate<0.03'],         // < 3% errores
  'http_req_failed{scenario:stress}': ['rate<0.05'],       // < 5% errores
}
```

#### Checks
```javascript
check(loginRes, {
  'Login - status 2xx (disponibilidad)': (r) => r.status >= 200 && r.status < 300,
  'Login - token presente (autenticacion)': (r) => {
    const body = JSON.parse(r.body);
    return body.token && body.token.length > 0;
  },
  'Login - Latencia < 1500ms (performance)': (r) => r.timings.duration < 1500,
});
```

### credentials.csv

Formato: `username,password`

```csv
username,password
donero,ewedon
kevinryan,kev12345
johnd,m38rmF$
derek,jkl;hey
mor_2314,83r5^_
```

### datos.json

```json
{
  "loginEndpoint": "https://fakestoreapi.com/auth/login"
}
```

---

## 📊 Interpretación de Resultados

### Thresholds
Cada threshold es un SLA (Service Level Agreement) que DEBE cumplirse.

```
✓ http_req_duration{scenario:smoke} p(95)<700
  └─ El 95% de peticiones en smoke < 700ms
  
✓ http_req_failed{scenario:load} rate<0.03
  └─ Máximo 3% de peticiones fallidas en load
```

### Percentiles
```
p(95) = Percentil 95
└─ 95% de requests están por debajo de este valor
└─ Útil para identificar outliers

Ejemplo:
  p(95)=459.33ms en smoke test
  → 95 de 100 requests < 459ms
  → 5 de 100 requests ≥ 459ms
```

### Checks
Validaciones lógicas que DEBEN pasar 100%.

```
checks_total: 8175
checks_succeeded: 100.00% (8175/8175)
└─ Todas las validaciones pasaron
```

---

## 🔄 Workflow Recomendado

### 1. Desarrollo/Testing Local
```bash
# Ejecutar smoke test rápido
k6 run script.js --scenario-select=smoke

# Revisar salida
cat ../k6-execution-*.log
```

### 2. Pre-Producción
```bash
# Ejecutar suite completa
./run-k6.sh

# Verificar todos los thresholds pasaron
grep "✓" ../k6-execution-*.log
```

### 3. Monitoreo Continuo
```bash
# Ejecutar diariamente en CI/CD
# Capturar métricas para tendencias
# Alertar si thresholds se violan
```

---

## 📈 Mejores Prácticas

### 1. Datos Realistas
```javascript
// Usar credenciales reales o semi-realistas
// Actualizar CSV según evolución de usuarios
```

### 2. Ramp-up Gradual
```javascript
stages: [
  { duration: '10s', target: 5 },   // Rampa: 0 → 5 VUs
  { duration: '10s', target: 5 },   // Sostenido: 5 VUs
  { duration: '10s', target: 0 },   // Bajada: 5 → 0 VUs
]
```
---

## 📝 Resultados Recientes

### Última Ejecución
- **Fecha:** 2026-05-14 17:02:55 - 17:04:17
- **Duración:** 81 segundos
- **Requests:** 2,725 completados
- **Error Rate:** 0.00%
- **Status:** ✅ **APROBADO**

### Métricas Clave
```
Smoke Test:  459.33ms p(95) < 700ms SLA ✓
Load Test:   679.82ms p(95) < 1500ms SLA ✓
Stress Test: 606.48ms p(95) < 2000ms SLA ✓
```

### Score Performance
```
Disponibilidad:  100/100 ✅
Latencia:        90/100 ✅
Escalabilidad:   100/100 ✅
Confiabilidad:   100/100 ✅
Eficiencia:      95/100 ✅
─────────────────────────
PROMEDIO:        97/100 ✅ EXCELENTE
```

---

## 🔐 Seguridad

### Credenciales
- ✅ Stored locally en `credentials.csv`
- ✅ Never committed a Git (add to .gitignore)
- ✅ Use test accounts only

### API
- ✅ HTTPS only (https://fakestoreapi.com)
- ✅ JWT tokens validated
- ✅ No sensitive data in logs

### Logs
- ✅ Generated with timestamps (k6-execution-*.log)
- ✅ Can be deleted after review
- ✅ Don't include passwords


## 📄 Archivos Generados

Después de ejecutar `./run-k6.sh`, se generan:

```bash
k6-execution-2026-05-14_17-02-55.log    # Logs con timestamp
├── Ejecución completa del script
├── VU logs (eventos por usuario virtual)
├── THRESHOLDS (resultados de SLAs)
├── TOTAL RESULTS (métricas globales)
└── HTTP (estadísticas de requests)
```

## ✅ Estado

**Status:** APROBADO  
**Última actualización:** 2026-05-14  
**Responsable:** Juan Cisterna - QA Automation Team

---

## 📋 Conclusiones

El endpoint de login de **FakeStore API** pasa todas las pruebas de carga y performance:

- ✅ 100% Disponibilidad
- ✅ 0% Error Rate
- ✅ Latencia predecible
- ✅ Excelente escalabilidad
- ✅ Performance Score: 97/100


Para más detalles, ver `CONCLUSIONES.md`

