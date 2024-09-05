package med.voll.api.domain.comentario;

import jakarta.validation.constraints.NotNull;
import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.atividade.DadosCadastroAtividade;
import med.voll.api.domain.usuario.DadosCadastroUsuario;
import med.voll.api.domain.usuario.Usuario;

import javax.xml.crypto.Data;
import java.util.Date;

public record DadosCadastroComentario(

        @NotNull
        String descricao_comentario,

        @NotNull
        String titulo_comentario,

        @NotNull
        Date data_comentario,

        @NotNull
       Usuario usuario_comentario,

        @NotNull
        Atividade atividade_comentada
) {
}
