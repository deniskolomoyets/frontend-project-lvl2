install:
	npm install
	
lint:
	npx eslint .

test:
	npm run test

test-coverage:
	npm test -- --coverage --coverageProvider=v8