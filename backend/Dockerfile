FROM python:3.12.2 as Builder

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install --prefix=/install -r requirements.txt

FROM python:3.12.2-slim

WORKDIR /app

COPY --from=Builder /install /usr/local/
COPY . .

EXPOSE "8000"


