-- Active: 1695307927892@@localhost@3306
CREATE TABLE [dbo].[Usuario] (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_usuario VARCHAR(50) NOT NULL,
    sobrenome_usuario VARCHAR(30) NOT NULL,
    email_usuario VARCHAR(50) NOT NULL,
    senha_usuario VARCHAR(8) NOT NULL,
    foto_perfil_usuario LONGBLOB, -- Corrigi para LONGBLOB para armazenar imagens maiores
    fk_tipo_usuario INT,
    CONSTRAINT fk_tipo_usuario FOREIGN KEY (fk_tipo_usuario) REFERENCES TipoUsuario(id_tipo_usuario) -- Corrigi a referência da chave estrangeira
);
