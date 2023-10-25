CREATE TABLE alocacao_projeto (
    id INT NOT NULL AUTO_INCREMENT,
    cargo VARCHAR(100) NOT NULL,
    id_projeto INT,
    id_usuario INT,
    CONSTRAINT id_projeto_alocacao_projeto FOREIGN KEY (id_projeto) REFERENCES futurize.projeto(id),
    CONSTRAINT id_usuario_alocaco_projeto FOREIGN KEY (id_usuario) REFERENCES futurize.usuarios(id),
    primary key (id)
)