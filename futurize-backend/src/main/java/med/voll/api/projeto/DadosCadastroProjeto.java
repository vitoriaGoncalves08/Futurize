package med.voll.api.projeto;

import med.voll.api.usuario.DadosCadastroUsuario;

import java.util.Date;

public record DadosCadastroProjeto(String nome, Date Encerramento, DadosCadastroUsuario gestor) {

}
