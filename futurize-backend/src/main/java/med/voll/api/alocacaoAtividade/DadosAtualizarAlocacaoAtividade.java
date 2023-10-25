package med.voll.api.alocacaoAtividade;

import jakarta.validation.constraints.NotNull;
import med.voll.api.atividade.Atividade;
import med.voll.api.usuario.Usuario;

import java.util.Date;

public record DadosAtualizarAlocacaoAtividade(
        @NotNull
        Long id,
        Date data_inicio,
        Date data_encerramento,
        Usuario usuario,
        Atividade atividade) {
}
