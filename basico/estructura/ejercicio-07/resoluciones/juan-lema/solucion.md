# Biblioteca de ciencia ficción — Juan Lema

## Tematica

Libros y ciencia ficcion. Coleccion digital organizada de libros, con sus
datos, portadas y resenas separados en carpetas independientes.

## Estructura de carpetas

```
juan-lema/
├── solucion.md                    # este archivo (explicacion y evidencia)
└── biblioteca-ciencia-ficcion/
    ├── books/
    │   ├── covers/
    │   │   └── .gitkeep           # registra la carpeta vacia en Git
    │   └── data/
    │       ├── dune-1965.json
    │       └── neuromante-1984.json
    ├── docs/
    │   └── convenciones-portadas.md
    ├── reviews/
    │   ├── plantilla-resena.md
    │   └── dune-1965-resena.md
    └── validar.js                 # valida que cada libro cumpla la estructura
```

## Como se conecta cada archivo

- Cada libro tiene un `id` unico en su JSON dentro de `books/data/`
  (por ejemplo `dune-1965`).
- `docs/convenciones-portadas.md` define que el nombre de la portada en
  `books/covers/` debe ser igual a ese `id` mas la extension de imagen
  (`dune-1965.jpg`). El campo `portada` de cada JSON referencia ese archivo.
- `reviews/plantilla-resena.md` es la base para escribir una resena; cada
  resena real (como `dune-1965-resena.md`) se nombra `{id}-resena.md` para
  poder relacionarla con su libro sin ambiguedad.
- `validar.js` lee los JSON de `books/data/` y confirma que cada libro tenga
  los campos obligatorios y que el nombre de portada siga la convencion
  documentada.

Flujo: `books/data/*.json` (datos) → `validar.js` (verifica estructura) →
`books/covers/` y `reviews/` (recursos relacionados por `id`), todo descrito
en `docs/convenciones-portadas.md`.

## Como pense el problema

1. Identifique que un libro tiene tres tipos de informacion distinta: datos
   estructurados (JSON), un recurso visual (portada) y una opinion de texto
   libre (resena). Cada tipo merece su propia carpeta.
2. Elegi el `id` del libro (`titulo-anio` en minusculas y con guiones) como
   llave comun para conectar el JSON, la portada y la resena sin depender
   del nombre exacto del titulo, que puede tener espacios o acentos.
3. Documente la convencion de nombres antes de escribir los datos, para que
   cualquier libro nuevo que se agregue siga el mismo patron.
4. Escribi `validar.js` como una capa aparte que revisa la coleccion contra
   esas reglas, en vez de confiar en que se siguieron a mano.

## Notas tecnicas

- `validar.js` usa `require()` para leer los `.json`, por lo que se ejecuta
  con Node (`node validar.js`) desde la carpeta `biblioteca-ciencia-ficcion/`.
- El campo `portada` de cada libro se valida contra `{id}.jpg`; si alguien
  sube una portada `.png` o con otro nombre, `validar.js` lo marca como error.
- `.gitkeep` se mantiene en `books/covers/` porque Git no versiona carpetas
  vacias; al no incluir imagenes reales en esta entrega, ese archivo evita
  que la carpeta desaparezca del repositorio.

## Validacion (dos casos)

Caso normal — dos libros con todos los campos y portada correcta:

```
Libros evaluados: 2
Estado: OK
Todos los libros cumplen la estructura esperada.
  [OK ] dune-1965
  [OK ] neuromante-1984
```

Caso limite — coleccion vacia (sin libros que validar):

```
Libros evaluados: 0
Estado: OK
La coleccion esta vacia, no hay nada que validar.
```

`validar.js` tambien detecta, aunque no se muestre arriba, libros con campos
faltantes o con un nombre de portada que no coincide con su `id`; en ese
caso el libro se marca como `ERR` junto con el detalle del error.
