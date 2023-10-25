package med.voll.api.alocacaoAtividade;

import jakarta.validation.constraints.NotNull;
import med.voll.api.atividade.Atividade;
import med.voll.api.usuario.Usuario;
import java.util.Date;

public record DadosCadastroAtividadeAlocacaoAtividade(
        @NotNull
        Date data_inicio,
        @NotNull
        Date data_encerramento,
        @NotNull
        Usuario usuario,
        @NotNull
        Atividade atividade) {

}
