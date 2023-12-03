CREATE TABLE alocacao_atividade (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(150)NOT NULL,
    data DATE NOT NULL,
    id_atividade INT,
    id_usuario INT,
    CONSTRAINT id_atividade_comentario FOREIGN KEY (id_atividade) REFERENCES futurize.atividade(id),
    CONSTRAINT id_usuario_comentario FOREIGN KEY (id_usuario) REFERENCES futurize.usuario(id),
    primary key (id)
)