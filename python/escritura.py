import yaml

data = {
    'nombre': 'Juan',
    'edad': 30,
    'intereses': ['python', 'lectura', 'deportes']
}

# Escribe el diccionario como YAML en un archivo
with open('../archyml/output.yaml', 'w') as file:
    yaml.dump(data, file)
