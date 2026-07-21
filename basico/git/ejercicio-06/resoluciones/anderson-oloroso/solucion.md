# Resolucion ejercicio 06 de git

**Henrik Anderson Oloroso García**

- Solución completa: 

Para resolver el ejercicio se debe realizar el siguiente flujo de trabajo con Git:
``` bash
git checkout dev
git pull origin dev
git checkout -b solucion-ejercicio-06
git add .
git commit -m "Agrega solución del ejercicio 06"
git push origin solucion-ejercicio-06
```
- Breve explicación:

Primero se cambia a la rama dev con git checkout dev para trabajar desde la rama de desarrollo. Luego se ejecuta git pull origin dev para actualizar la rama local con los cambios más recientes del repositorio remoto.

Después se crea una nueva rama llamada solucion-ejercicio-06 para desarrollar la solución de forma independiente. Una vez realizados los cambios, git add . prepara los archivos modificados, git commit registra la solución y git push publica la nueva rama en el repositorio remoto.

Ejecutar git pull antes de comenzar reduce la posibilidad de conflictos porque permite obtener los cambios más recientes realizados por otros colaboradores. Así, se trabaja sobre una versión actualizada del proyecto y se disminuye el riesgo de que los cambios locales entren en conflicto al momento de integrar la solución.