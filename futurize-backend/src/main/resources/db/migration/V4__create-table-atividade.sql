CREATE TABLE atividade(
     id INT  NOT NULL AUTO_INCREMENT,
     titulo VARCHAR(100) NOT NULL,
     descricao VARCHAR(200) NOT NULL,
     inicio DATE NOT NULL,
     encerramento DATE NOT NULL,
     estado varchar(100) not null,
     id_projeto INT,
     CONSTRAINT id_projeto_atividade FOREIGN KEY (id_projeto) REFERENCES futurize.projeto(id),
     primary key (id)
);