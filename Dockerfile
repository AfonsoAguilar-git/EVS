# 1. Define a imagem base (Python)
FROM python:3.10-slim

# 2. Define a pasta de trabalho dentro do contentor
WORKDIR /code

# 3. Copia a "lista de compras" para dentro do contentor
COPY ./requirements.txt /code/requirements.txt

# 4. Instala as bibliotecas listadas no requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 5. Copia a tua pasta "Server" para dentro do contentor
COPY ./Server /code/Server

# 6. Comando para ligar o servidor 
# Importante: aponta para a pasta Server e o ficheiro Server.py
CMD ["uvicorn", "Server.Server:app", "--host", "0.0.0.0", "--port", "8000"]