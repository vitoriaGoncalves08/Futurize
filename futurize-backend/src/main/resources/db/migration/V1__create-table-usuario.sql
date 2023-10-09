CREATE TABLE usuarios(
    id bigint not null auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(100) not null,
    cargo varchar(100) not null,
    primary key (id)
);