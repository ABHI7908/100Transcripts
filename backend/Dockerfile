FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1
RUN apt-get update && apt-get install -y --no-install-recommends build-essential libpq-dev curl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt requirements-production.txt /app/
RUN pip install -r requirements.txt -r requirements-production.txt
COPY . /app
RUN useradd -u 1000 -m appuser && chown -R appuser /app
USER appuser
EXPOSE 8000
ENTRYPOINT ["/app/entrypoint.sh"]
