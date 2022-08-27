FROM python:3.8.10-slim
ENV PYTHONUNBUFFERED=1

WORKDIR /usr/src/service
COPY . /usr/src/service

RUN pip install -r requirements.txt
RUN pip install -r core/requirements.txt

CMD ["python", "main.py"]