-- Active: 1695307927892@@localhost@3306
CREATE TABLE [dbo].[Atividade]
(
id_atividade INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome_atividade VARCHAR(30)NOT NULL,
data_inicio_atividade DATETIME,
data_fim_atividade DATETIME ,
status_atividade BOOLEAN NOT NULL,
descricao_atividade VARCHAR (200),
prioridade_atividade VARCHAR (30),
dificulade_atividade VARCHAR (20),
fkprojeto INT ,
CONSTRAINT fkprojeto  FOREIGN KEY (fkprojeto) REFERENCES Projeto (id_projeto)
);
