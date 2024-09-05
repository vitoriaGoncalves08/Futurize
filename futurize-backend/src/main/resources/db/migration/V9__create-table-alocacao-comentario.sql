CREATE TABLE alocacao_comentario (
     id INT NOT NULL AUTO_INCREMENT,
     id_comentario INT,
     id_usuario INT,
     CONSTRAINT id_comentario_alocacao_a FOREIGN KEY (id_projeto) REFERENCES futurize.comentario(id),
     CONSTRAINT id_usuario_alocaco_projeto FOREIGN KEY (id_usuario) REFERENCES futurize.usuario(id),
     primary key (id)
)