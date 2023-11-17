CREATE TABLE alocacao_atividade (
    id INT NOT NULL AUTO_INCREMENT,
    data_inicio DATE NOT NULL,
    data_encerramento DATE NOT NULL,
    estado VARCHAR(30) NOT NULL,
    id_atividade INT,
    id_usuario INT,
    CONSTRAINT id_projeto_alocacao_atividade FOREIGN KEY (id_atividade) REFERENCES futurize.atividade(id),
    CONSTRAINT id_usuario_alocaco_atividade FOREIGN KEY (id_usuario) REFERENCES futurize.usuario(id),
    primary key (id)
)