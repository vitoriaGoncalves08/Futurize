CREATE TABLE usuario(
    id INT not null auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(100) not null,
    primary key (id)
);