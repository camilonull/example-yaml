const yaml = require('js-yaml');
const fs   = require('fs');

const data = {
  nombre: 'Juan',
  edad: 30,
  intereses: ['JavaScript', 'lectura', 'deportes']
};

// Escribe el objeto JavaScript como YAML en un archivo
try {
  fs.writeFileSync('../archyml/output.yaml', yaml.dump(data), 'utf8');
} catch (e) {
  console.log(e);
}
