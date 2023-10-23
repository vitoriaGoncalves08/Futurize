CREATE TABLE atividade(
     id INT  NOT NULL AUTO_INCREMENT,
     titulo VARCHAR(100) NOT NULL,
     descricao VARCHAR(200) NOT NULL,
     inicio DATE NOT NULL,
     encerramento DATE NOT NULL,
     status varchar(100) not null,
     primary key (id)
);