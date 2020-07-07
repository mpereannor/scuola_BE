# scuola_BE
issue tracking for educators


```sh
curl -v -X POST localhost:7000/api/auth/register -H 'Content-Type: application/json' \
    -d '{"username": "neptune", "fullname": "maitre gims neptune", "email" : "neptunecorazion@gims.com", "password": "secret1010", "passwordConfirmation": "secret1010"}'
```

```sh
curl -v -X POST localhost:7000/api/auth/login -H 'Content-Type: application/json' \
    -d '{"email" : "neptunecorazion@gims.com", "password": "secret1010"}'
```