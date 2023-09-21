CREATE TABLE [dbo].[Projeto] (
   id_projeto INTEGER PRIMARY KEY NOT NULL , 
   nome_projeto VARCHAR(30),
   data_inico_projeto DATETIME,
   status_projeto BOOLEAN,
   fk_usuario_projeto INTEGER,
   CONSTRAINT fk_usuario_projeto  FOREIGN KEY (fk_usuario_projeto) REFERENCES id_user (Usuario)
)