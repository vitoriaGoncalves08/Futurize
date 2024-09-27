-- Active: 1695307927892@@localhost@3306
CREATE TABLE [dbo].[Projeto](
   id_projeto INT PRIMARY KEY AUTO_INCREMENT NOT NULL , 
   nome_projeto VARCHAR(30),
   data_inico_projeto DATETIME,
   status_projeto BOOLEAN,
   fk_usuario_projeto INT,
   CONSTRAINT fk_usuario_projeto  FOREIGN KEY (fk_usuario_projeto) REFERENCES Usuario (id_usuario)
);
