_:
	make init

init:
	cp .env.example .env
	cp .env.server.example .env.server
	yarn install
	docker-compose build

start:
	docker-compose up -d
	yarn start

clean:
	docker-compose down
	rm -rf node_modules
	rm -rf .cache-loader
	rm -rf .tmp
	rm -rf build
	rm -rf logs/*.log
	rm -rf yarn-error.log

