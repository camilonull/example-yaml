// Importamos las librerías necesarias: js-yaml para trabajar con YAML,
// fs para leer archivos, y Ajv para validar datos con un esquema JSON
const yaml = require('js-yaml');
const fs   = require('fs');
const Ajv = require('ajv');

// Creamos una instancia de Ajv, el validador de esquemas JSON
const ajv = new Ajv();

// Definimos el esquema de validación con las reglas que debe cumplir el archivo YAML
const schema = {
  type: 'object',  // El archivo debe contener un objeto
  properties: {
    nombre: { type: 'string' },  // "nombre" debe ser una cadena de texto
    edad: { type: 'integer' },   // "edad" debe ser un número entero
    intereses: { 
      type: 'array',             // "intereses" debe ser un arreglo
      items: { type: 'string' }  // Los elementos dentro del arreglo deben ser cadenas de texto
    }
  },
  required: ['nombre', 'edad']   // "nombre" y "edad" son campos obligatorios
};

// Compilamos el esquema con Ajv para generar la función de validación
const validate = ajv.compile(schema);

try {
  // Leemos el archivo YAML y lo convertimos a un objeto JavaScript
  const config = yaml.load(fs.readFileSync('../archyml/output.yaml', 'utf8'));

  // Validamos el objeto JavaScript contra el esquema definido
  const valid = validate(config);

  // Si el archivo no cumple con el esquema, mostramos los errores
  if (!valid) console.log(validate.errors);
  else console.log('Archivo YAML válido');  // Si todo está correcto, imprimimos un mensaje de validación exitosa
} catch (e) {
  // Capturamos cualquier error que ocurra al leer o validar el archivo
  console.log(e);
}

// Parte opcional: volvemos a leer el archivo YAML y mostramos su contenido en consola
try {
  const config = yaml.load(fs.readFileSync('../archyml/output.yaml', 'utf8'));
  console.log(config);  // Mostramos el contenido del archivo YAML como un objeto JavaScript
} catch (e) {
  console.log(e);  // Capturamos y mostramos cualquier error que ocurra durante la lectura del archivo
}
