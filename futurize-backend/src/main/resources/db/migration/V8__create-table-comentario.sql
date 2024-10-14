CREATE TABLE comentario(
    id INT NOT NULL AUTO_INCREMENT,
    titulo_comentario varchar(40) NOT NULL,
    descricao_comentario  varchar(200) NOT NULL,
    data_comentario DATE NOT NULL,
    usuario_comentario INT NOT NULL,
    atividade_comentada INT NOT NULL,
    CONSTRAINT id_usuario_comentario FOREIGN KEY (usuario_comentario) REFERENCES futurize.usuario(id),
    CONSTRAINT id_atividade_comentada FOREIGN KEY (atividade_comentada) REFERENCES futurize.atividade(id),
    primary key (id)
)