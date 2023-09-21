CREATE TABLE [dbo].[Status]
(
id_status INTEGER PRIMARY KEY NOT NULL,
nome_status VARCHAR(30) NOT NULL,
fkatividade_status INTEGER,
CONSTRAINT fkatividade_status  FOREIGN KEY (fkatividade_status) REFERENCES id_atividade (Atividade)

)