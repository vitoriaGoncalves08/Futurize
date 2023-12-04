package med.voll.api.comentario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import med.voll.api.atividade.Atividade;
import med.voll.api.atividade.DadosCadastroAtividade;
import med.voll.api.usuario.DadosCadastroUsuario;
import med.voll.api.usuario.Usuario;

import java.util.Date;

public record DadosCadastroComentario(
        @NotBlank
        String titulo,
        @NotBlank
        String descricao,
        @NotNull
        Date data_comentario,
        @NotNull
        Usuario usuario,
        @NotNull
        Atividade atividadecomentada) {
}
