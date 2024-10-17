const yaml = require('js-yaml');
const fs = require('fs').promises; // Usaremos el módulo fs con Promesas para manejo asíncrono de archivos

// Función para cargar el archivo YAML
async function cargarReglas() {
  try {
    const archivoYAML = await fs.readFile('../archyml/reglas_automatizacion.yaml', 'utf8');
    const reglas = yaml.load(archivoYAML);
    console.log('Reglas cargadas:', reglas);
    return reglas;
  } catch (e) {
    console.log('Error cargando las reglas:', e);
    return {};
  }
}

// Función para guardar reglas en el archivo YAML
async function guardarReglas(reglas) {
  try {
    await fs.writeFile('../archyml/reglas_automatizacion.yaml', yaml.dump(reglas), 'utf8');
    console.log('Reglas de automatización guardadas.');
  } catch (e) {
    console.log('Error guardando las reglas:', e);
  }
}

// Función para agregar una nueva regla de automatización
async function agregarRegla(nuevaRegla) {
  try {
    let reglas = await cargarReglas();
    
    if (!reglas) reglas = { reglas_automatizacion: [] }; // Si no existe el archivo, crear un objeto base
    
    // Validar la nueva regla antes de agregarla
    if (validarRegla(nuevaRegla)) {
      reglas.reglas_automatizacion.push(nuevaRegla);
      await guardarReglas(reglas);
      console.log('Nueva regla agregada.');
    } else {
      console.log('La nueva regla no es válida.');
    }
  } catch (e) {
    console.log('Error agregando la nueva regla:', e);
  }
}

// Validar la estructura de la regla antes de agregarla
function validarRegla(regla) {
  return regla.evento && regla.accion && Array.isArray(regla.dispositivos_activados);
}

// Función principal
async function main() {
  // Crear una nueva regla de automatización
  const nuevaRegla = {
    evento: 'detectar_humo',
    accion: 'activar_sistema_contra_incendios',
    dispositivos_activados: ['Alarma de humo', 'Aspersores de agua']
  };

  await agregarRegla(nuevaRegla);

  // Mostrar las reglas actualizadas
  const reglasActualizadas = await cargarReglas();
  console.log('Reglas de automatización actualizadas:', reglasActualizadas);
}

// Ejecutar la función principal
main();
