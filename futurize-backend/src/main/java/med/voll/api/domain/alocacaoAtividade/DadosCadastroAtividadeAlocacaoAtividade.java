package med.voll.api.domain.alocacaoAtividade;

import jakarta.validation.constraints.NotNull;
import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.usuario.Usuario;
import java.util.Date;

public record DadosCadastroAtividadeAlocacaoAtividade(
        @NotNull
        Date data_inicio,
        @NotNull
        Date data_encerramento,
        @NotNull
        Estado estado,
        @NotNull
        Usuario usuario,
        @NotNull
        Atividade atividade) {

}
