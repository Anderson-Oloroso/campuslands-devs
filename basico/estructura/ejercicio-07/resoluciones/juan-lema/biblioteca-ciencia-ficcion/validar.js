// validar.js
// Valida que cada libro registrado en books/data cumpla con la
// estructura minima esperada y con la convencion de nombres de portada.

const dune = require("./books/data/dune-1965.json");
const neuromante = require("./books/data/neuromante-1984.json");

const CAMPOS_OBLIGATORIOS = ["id", "titulo", "autor", "anio", "genero", "portada", "sinopsis"];

function validarLibro(libro) {
  const errores = [];

  const camposFaltantes = CAMPOS_OBLIGATORIOS.filter((campo) => {
    return libro[campo] === undefined || libro[campo] === null || libro[campo] === "";
  });

  if (camposFaltantes.length > 0) {
    errores.push(`Faltan campos: ${camposFaltantes.join(", ")}`);
  }

  if (libro.id && libro.portada) {
    const portadaEsperada = `${libro.id}.jpg`;
    if (libro.portada !== portadaEsperada) {
      errores.push(
        `La portada "${libro.portada}" no sigue la convencion (esperado "${portadaEsperada}")`
      );
    }
  }

  return {
    id: libro.id ?? "(sin id)",
    valido: errores.length === 0,
    errores,
  };
}

function validarColeccion(libros) {
  if (libros.length === 0) {
    return {
      totalLibros: 0,
      valida: true,
      mensaje: "La coleccion esta vacia, no hay nada que validar.",
      detalle: [],
    };
  }

  const detalle = libros.map(validarLibro);
  const invalidos = detalle.filter((resultado) => !resultado.valido);

  return {
    totalLibros: libros.length,
    valida: invalidos.length === 0,
    mensaje:
      invalidos.length === 0
        ? "Todos los libros cumplen la estructura esperada."
        : `${invalidos.length} libro(s) con errores.`,
    detalle,
  };
}

function imprimirResultado(resultado) {
  console.log(`Libros evaluados: ${resultado.totalLibros}`);
  console.log(`Estado: ${resultado.valida ? "OK" : "CON ERRORES"}`);
  console.log(resultado.mensaje);

  resultado.detalle.forEach((item) => {
    const estado = item.valido ? "OK " : "ERR";
    console.log(`  [${estado}] ${item.id}`);
    item.errores.forEach((error) => console.log(`        - ${error}`));
  });
}

// Caso normal: coleccion con dos libros validos
const coleccion = [dune, neuromante];
imprimirResultado(validarColeccion(coleccion));

console.log("---");

// Caso limite: coleccion vacia
imprimirResultado(validarColeccion([]));

module.exports = { validarLibro, validarColeccion };
