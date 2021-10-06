const config = {
  user: "admin",
  password: "password",
  server: "1.2.3.4",
  database: "database",
  options: { trustedconnection: false },
  port: 1433,
  encrypt: true,
  trustServerCertificate: true,
  IntegratedSecurity: false,
};

module.exports = config;
