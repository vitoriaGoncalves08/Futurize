CREATE TABLE [dbo].[AlocacaoAtividade]
(
id_alocacao_atividade INTEGER PRIMARY KEY  NOT NULL,
fkusuario_alocatv INTEGER NOT NULL,
fkatividade_alocatv INTEGER NOT NULL,
status_atividade BOOLEAN,
data_inicio_atividade DATETIME NOT NULL,
data_encerramento_atividade DATETIME,
CONSTRAINT fkusuario_alocatv  FOREIGN KEY (fkusuario_alocatv) REFERENCES id_user (Usuario),
CONSTRAINT fkatividade_alocatv  FOREIGN KEY (fkatividade_alocatv) REFERENCES id_atividade (Atividade)

)