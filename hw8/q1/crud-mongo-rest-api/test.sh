
curl -H "Content-Type: application/json" -X POST -d '{"balance":100, "name":"checking"}' "http://localhost:3000/accounts"


curl -H "Content-Type: application/json" -X PUT -d '{"balance":200, "name":"savings"}' "http://localhost:3000/accounts/5dc06f9c61d4a9335e4d3163"


curl "http://localhost:3000/accounts"


curl -X DELETE "http://localhost:3000/accounts/5dc06f9c61d4a9335e4d3163"