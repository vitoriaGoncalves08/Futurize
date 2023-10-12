package med.voll.api.atividade;

import med.voll.api.projeto.DadosCadastroProjeto;
import med.voll.api.usuario.DadosCadastroUsuario;

import java.util.Date;

public record DadosCadastroAtividade(String nome, String descricao, Date termino, Status status, DadosCadastroUsuario responsavel, DadosCadastroProjeto projeto ) {
}
