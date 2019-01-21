CREATE TABLE usuario(
id serial NOT NULL,
name varchar(255),
usuario varchar(255),
pass varchar(255),
sexo varchar(255),
edad varchar(255),
contacto varchar(255),
PRIMARY KEY (id)
);

INSERT INTO usuario ( name,usuario,pass,sexo,edad,contacto) VALUES
('Keila Cuenca','kei','kei','femenino','23','0994301859');

INSERT INTO usuario ( name,usuario,pass,sexo,edad,contacto) VALUES
('Walter Fabre','wal','wal','masculino','23','0994301859');

INSERT INTO usuario ( name,usuario,pass,sexo,edad,contacto) VALUES
('Jossie Buchanan','jos','jos','femenino','19','0994301859');

INSERT INTO usuario ( name,usuario,pass,sexo,edad,contacto) VALUES
('Peyton Allen','pey','pey','masculino','18','0994301859');

