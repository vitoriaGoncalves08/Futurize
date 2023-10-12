package med.voll.api.comentario;

import med.voll.api.atividade.DadosCadastroAtividade;
import med.voll.api.usuario.DadosCadastroUsuario;

public record DadosCadastroComentario(String titulo, String descricao, DadosCadastroUsuario comentarista, DadosCadastroAtividade atividadecomentada) {
}
