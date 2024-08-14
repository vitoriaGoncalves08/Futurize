package med.voll.api.domain.comentario;

import med.voll.api.domain.atividade.DadosCadastroAtividade;
import med.voll.api.domain.usuario.DadosCadastroUsuario;

public record DadosCadastroComentario(String titulo, String descricao, DadosCadastroUsuario comentarista, DadosCadastroAtividade atividadecomentada) {
}
