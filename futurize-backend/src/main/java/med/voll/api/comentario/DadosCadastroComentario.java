package med.voll.api.comentario;

import med.voll.api.atividade.DadosCadastroAtividade;
import med.voll.api.usuario.DadosCadastroUsuario;

import java.util.Date;

public record DadosCadastroComentario(String titulo, String descricao, Date data, DadosCadastroUsuario usuario, DadosCadastroAtividade atividadecomentada) {
}
