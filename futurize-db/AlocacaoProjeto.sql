-- Active: 1695307927892@@localhost@3306

CREATE TABLE [dbo].[AlocacaoProjeto]
(
id_alocacao_projeto INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
fktipo_usuario INT NOT NULL,
fknome_usuario INT NOT NULL,
fknome_projeto INT NOT NULL,
data_inicio_atividade DATETIME,
data_encerramento_projeto DATETIME,
status_alocacao_projeto BOOLEAN NOT NULL,


CONSTRAINT fknome_usuario  FOREIGN KEY (fknome_usuario) REFERENCES  usuario (id_usuario),
CONSTRAINT fktipo_usuario  FOREIGN KEY (fktipo_usuario) REFERENCES TipoUsuario (id_tipo_usuario),
CONSTRAINT fknome_projeto  FOREIGN KEY (fknome_projeto) REFERENCES  Projeto (id_projeto)
);