
FROM python:3.10-slim


WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./ /code/Server/

WORKDIR /code

CMD ["uvicorn", "Server.Server:app", "--host", "0.0.0.0", "--port", "8000"]