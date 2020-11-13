default: init

init: reset-docker build up

reset-docker:
	-docker-compose down --rmi=local --volumes --remove-orphans

up:
	docker-compose up -d --force-recreate redis

start:
	node build/

build: 
	docker-compose build redis

ssh:
	docker exec -it redis /bin/sh