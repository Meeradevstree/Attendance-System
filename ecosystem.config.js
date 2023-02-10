module.exports = {
    apps: [
      {
        name: "AttendanceSystem",
        script: "./bin/www",
        watch: true,
        ignore_watch: ["node_modules", "public", "logs"],
        env_local: {
          PORT: 4500,
          NODE_ENV: "local",
          DOMAIN_URL: "http://127.0.0.1:4500",
          DB_MONGO_URL: "mongodb://localhost:27017/AttendanceSystem",
          JWT_SECRET: "jsonwebtoken"
        },
        env: {
          PORT: 4500,
          NODE_ENV: "local",
          DOMAIN_URL: "http://127.0.0.1:4500",
          DB_MONGO_URL: "mongodb://localhost:27017/AttendanceSystem",
          JWT_SECRET: "jsonwebtoken"
          
        },
        env_production: {
          PORT: 4500,
          NODE_ENV: "production",
          DOMAIN_URL: "http://127.0.0.1:4500",
          DB_MONGO_URL: "mongodb://localhost:27017/AttendanceSystem",
          JWT_SECRET: "jsonwebtoken"
        },
        env_staging: {
          PORT: 4500,
          NODE_ENV: "staging",
          DOMAIN_URL: "http://127.0.0.1:4500",
          DB_MONGO_URL: "mongodb://localhost:27017/AttendanceSystem",
          JWT_SECRET: "jsonwebtoken"
        },
      },
    ],
  };
  
  //pm2 start ecosystem.config.js --env local