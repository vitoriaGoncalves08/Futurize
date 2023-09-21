CREATE TABLE [dbo].[Comentario]
(
    id_comentario INTEGER PRIMARY KEY NOT NULL,
    descricao_comentario VARCHAR(255),
    data_comentario DATETIME,
    fk_user_comentario INTEGER,
    fk_atividade_comentario INTEGER,
    CONSTRAINT fk_atividade_comentario  FOREIGN KEY (fk_atividade_comentario) REFERENCES id_atividade (Atividade),
    CONSTRAINT fk_user_comentario  FOREIGN KEY (fk_user_comentario) REFERENCES id_user (Usuario)
)