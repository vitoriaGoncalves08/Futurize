package med.voll.api.comentario;

import jakarta.validation.constraints.NotNull;
import med.voll.api.atividade.Atividade;
import med.voll.api.atividade.Dificuldade;
import med.voll.api.atividade.Estado;
import med.voll.api.usuario.Usuario;

import java.util.Date;

public record DadosAtualizarComentario(
        @NotNull
        Long id,
        String titulo,
        String descricao,
        Date data_comentario,
        Atividade atividadecomentada,
        Usuario usuario
) {
}
