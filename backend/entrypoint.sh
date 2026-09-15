#!/bin/sh
set -e
for i in $(seq 1 30); do
  python manage.py migrate --noinput && break
  echo "DB not ready, retrying..."
  sleep 3
done
python manage.py collectstatic --noinput
exec gunicorn Transcripts.wsgi:application --bind 0.0.0.0:8000 --workers 3 --threads 2 --timeout 60 --access-logfile /app/logs/access.log --error-logfile /app/logs/error.log
