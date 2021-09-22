const config = {
  user: "admin",
  password: "senhalucas",
  server: "flight-data.cm6a4kosihs5.us-west-2.rds.amazonaws.com",
  database: "db1b",
  options: { trustedconnection: false },
  port: 1433,
  encrypt: true,
  trustServerCertificate: true,
  IntegratedSecurity: false,
};

module.exports = config;
