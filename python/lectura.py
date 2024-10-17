import yaml

# Abre y lee un archivo YAML
with open('../archyml/output.yaml', 'r') as file:
    config = yaml.safe_load(file)

print(config)  # Muestra los datos en formato de diccionario de Python
