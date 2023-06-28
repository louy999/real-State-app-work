
 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

 CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  number NUMERIC(11) NOT NULL,
  statusAccess VARCHAR(200)
 );