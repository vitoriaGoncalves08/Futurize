-- Active: 1695307927892@@localhost@3306
CREATE TABLE [dbo].[AlocacaoAtividade](
    id_alocacao_atividade INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fkusuario_alocatv INT NOT NULL,
    fkatividade_alocatv INT NOT NULL,
    status_atividade BOOLEAN,
    data_inicio_atividade DATETIME NOT NULL,
    data_encerramento_atividade DATETIME,
    CONSTRAINT fk_usuario_alocatv FOREIGN KEY (fkusuario_alocatv) REFERENCES Usuario(id_usuario),
    CONSTRAINT fk_atividade_alocatv FOREIGN KEY (fkatividade_alocatv) REFERENCES Atividade(id_atividade)
);
