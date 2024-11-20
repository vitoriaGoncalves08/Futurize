-- Active: 1695307927892@@localhost@3306
CREATE TABLE [dbo].[Comentario]
(
    id_comentario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    descricao_comentario VARCHAR(255),
    data_comentario DATETIME,
    fk_user_comentario INT NOT NULL,
    fk_atividade_comentario INT NOT NULL,
    CONSTRAINT fk_atividade_comentario  FOREIGN KEY (fk_atividade_comentario) REFERENCES  Atividade(id_atividade),
    CONSTRAINT fk_user_comentario  FOREIGN KEY (fk_user_comentario) REFERENCES Usuario (id_usuario)
);