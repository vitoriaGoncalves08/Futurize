CREATE TABLE projeto(
     id INT not null auto_increment,
     titulo varchar(100) not null,
     descricao varchar(240),
     inicio date not null,
     encerramento date not null,
     estado varchar(100) not null,
     primary key (id)
);