#!/bin/bash

# Script simple para ejecutar K6 y guardar logs en la carpeta raíz
# Uso: ./run-k6.sh

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Crear timestamp
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="../k6-execution-${TIMESTAMP}.log"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}K6 Performance Test${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "📝 Archivo de logs: $LOG_FILE"
echo "⏱️  Inicio: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Ejecutar K6 y guardar salida en archivo
echo "🚀 Iniciando pruebas K6..." | tee "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"
echo "K6 PERFORMANCE TEST LOG" >> "$LOG_FILE"
echo "Start: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Ejecutar K6 y capturar salida
k6 run script.js 2>&1 | tee -a "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}

echo "" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"
echo "End: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
echo "Exit Code: $EXIT_CODE" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

# Resumen
echo ""
echo -e "${BLUE}========================================${NC}"
if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}✅ Prueba completada exitosamente${NC}"
else
  echo -e "${RED}⚠️  Prueba completada con warnings${NC}"
fi
echo -e "${BLUE}📁 Logs guardados en:${NC}"
echo -e "${BLUE}   $(cd .. && pwd)/${LOG_FILE#../}${NC}"
echo -e "${BLUE}📊 Tamaño: $(du -h "$LOG_FILE" | cut -f1)${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Mostrar últimas líneas importantes
echo -e "${BLUE}📌 RESUMEN:${NC}"
tail -30 "$LOG_FILE" | grep -E "THRESHOLDS|http_req_|checks_|TOTAL RESULTS|✓|✗" || tail -20 "$LOG_FILE"

exit $EXIT_CODE
