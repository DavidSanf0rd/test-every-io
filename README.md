Interview test

## Description

This is a basic dockerized authenticated crud inteview test done using typescript and node js.

## Running

```bash
$ docker-compose up
```

## Test users
```json
{ username: Sanford password: sanford }
```
```json
{ username: Sergey password: sergey }
```
```json
{ username: Barry password: barry }
```

## Important endpoints for testing

- Login:
```bash
$ curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "${username}",
    "password": "${password}"
}'
```
- Task Create:
```bash
curl --location --request POST 'http://localhost:3000/task' \
--header 'Authorization: Bearer ${token}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "new task",
    "description": "im the second task"
}'
```
- Task List:
```bash
curl --location --request GET 'http://localhost:3000/task' \
--header 'Authorization: Bearer ${token}'
```

- Task status list:
```bash
curl --location --request GET 'http://localhost:3000/task/status' \
--header 'Authorization: Bearer ${token}'
```
- Task update:
```bash
curl --location --request PATCH 'http://localhost:3000/task/1' \
--header 'Authorization: Bearer ${token}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "work on every.io",
    "description": "pass the interview on every.io",
    "statusId": 2
}'
```
- Task update (Only status id):
```bash
curl --location --request PATCH 'http://localhost:3000/task/1' \
--header 'Authorization: Bearer ${token}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "statusId": 3
}'
```
