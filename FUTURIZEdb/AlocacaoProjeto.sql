CREATE TABLE [dbo].[AlocacaoProjeto]
(
id_alocacao_projeto INTEGER PRIMARY KEY NOT NULL,
fktipo_usuario INTEGER,
fknome_usuario VARCHAR(50) ,
fknome_projeto VARCHAR(30) ,
data_inicio_atividade DATETIME,
data_encerramento_projeto DATETIME,
status_alocacao_projeto BOOLEAN NOT NULL,


CONSTRAINT fknome_usuario  FOREIGN KEY (fknome_usuario) REFERENCES id_user (Usuario),
CONSTRAINT fktipo_usuario  FOREIGN KEY (fktipo_usuario) REFERENCES id_tipo_usuario (TipoUsuarioUsuario),
CONSTRAINT fknome_projeto  FOREIGN KEY (fknome_projeto) REFERENCES id_projeto (Projeto),
)