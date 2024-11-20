-- Active: 1695307927892@@localhost@3306
CREATE TABLE [dbo].[ftzStatus]
(
id_status INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome_status VARCHAR(30) NOT NULL,
fkatividade_status INT,
CONSTRAINT fkatividade_status  FOREIGN KEY (fkatividade_status) REFERENCES Atividade(id_atividade)
);
