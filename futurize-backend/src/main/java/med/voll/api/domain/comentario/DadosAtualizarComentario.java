package med.voll.api.domain.comentario;

import jakarta.validation.constraints.NotNull;
import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.atividade.Dificuldade;
import med.voll.api.domain.atividade.Estado;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;

public record DadosAtualizarComentario(

    @NotNull
    Long id,
    String descricaoComentario,
    Date dataComentario,
    Usuario usuarioComentario,
    Atividade atividadeComentada

) {
}
