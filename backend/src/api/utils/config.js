module.exports={
    "port": 3000,
    "database": {
      "development": {
        "url": "mongodb://localhost:27017/myapp_dev"
      },
      "test": {
        "url": "mongodb://localhost:27017/myapp_test"
      },
      "production": {
        "url": "mongodb://user:password@mongo-db-instance-name:27017/myapp_prod"
      }
    },
    "jwtSecret": "mysecretkey"
  }
  