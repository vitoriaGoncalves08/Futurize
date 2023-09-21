CREATE TABLE [dbo].[Usuario]
(
id_user INTEGER NOT NULL PRIMARY KEY,
nome_user VARCHAR(50) NOT NULL,
sobrenome_user VARCHAR(30) NOT NULL,
email_user VARCHAR(20) NOT NULL,
senha_user VARCHAR(8) NOT NULL,
foto_perfil_user Varbinary (max),
fk_tipo_usuario INTEGER
CONSTRAINT fk_tipo_usuario  FOREIGN KEY (fk_tipo_usuario) REFERENCES id_tipo_usuario (TipoUsuario)
)
