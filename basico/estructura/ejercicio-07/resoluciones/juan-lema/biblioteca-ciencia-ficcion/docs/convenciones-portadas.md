# Convenciones para nombrar portadas

## Regla general

El nombre del archivo de portada debe ser identico al campo `id` del libro
en su JSON correspondiente, seguido de la extension de imagen.

```
{id-del-libro}.{extension}
```

## Ejemplos

| Libro       | id (en el JSON)   | Nombre de portada esperado |
|-------------|--------------------|------------------------------|
| Dune        | `dune-1965`         | `dune-1965.jpg`               |
| Neuromante  | `neuromante-1984`   | `neuromante-1984.jpg`         |

## Reglas adicionales

- Solo minusculas, sin espacios ni acentos (usar guiones `-` como separador).
- Extensiones permitidas: `.jpg` o `.png`.
- Un libro nunca puede tener dos portadas con el mismo `id`; si se sube una
  version nueva, se reemplaza el archivo existente, no se crea uno adicional.
- La carpeta `books/covers/` solo contiene imagenes de portada. Los datos del
  libro (titulo, autor, sinopsis, etc.) nunca van en este archivo, van en
  `books/data/{id-del-libro}.json`.

## Por que se separa portada y datos

Las imagenes son binarias y pesan distinto a un texto; mezclarlas con el
JSON dificultaria versionar los datos en Git. Al mantener `covers/` y
`data/` como carpetas independientes, se puede actualizar la portada de un
libro sin tocar su informacion, y viceversa.
