package med.voll.api.domain.alocacaoAtividade;

import jakarta.validation.constraints.NotNull;
import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;

public record DadosAtualizarAlocacaoAtividade(
        @NotNull
        Long id,
        Date data_inicio,
        Date data_encerramento,
        Estado estado,
        Usuario usuario,
        Atividade atividade) {
}
