CREATE TABLE [dbo].[Atividade]
(
id_atividade INTEGER PRIMARY KEY AUTOINCREMENT NO NULL ,
nome_atividade VARCHAR(30)NOT NULL,
data_inicio_atividade DATETIME,
data_fim_atividade DATETIME ,
status_atividade BOOLEAN NOT NULL,
descricao_atividade VARCHAR (200),
prioridade_atividade VARCHAR (30),
dificulade_atividade VARCHAR (20),
fkprojeto INTEGER ,
CONSTRAINT fkprojeto  FOREIGN KEY (fkprojeto) REFERENCES id_projeto (Projeto)

)