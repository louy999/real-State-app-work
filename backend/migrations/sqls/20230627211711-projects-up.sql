/* Replace with your SQL commands */
CREATE TABLE projects(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    cv VARCHAR(500) ,
    owner VARCHAR(500) ,
    location VARCHAR(500) ,
    design VARCHAR(500) ,
    facility VARCHAR(500) ,
    payment VARCHAR(500) ,
    type VARCHAR(500) ,
    evaluation VARCHAR(500) ,
    datecreate VARCHAR(500) 
);