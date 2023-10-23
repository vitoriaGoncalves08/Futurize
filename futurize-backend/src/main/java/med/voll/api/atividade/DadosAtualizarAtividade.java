package med.voll.api.atividade;

import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record DadosAtualizarAtividade(
        @NotNull
        Long id,
        String titulo,
        String descricaco,
        Date encerramento,
        Status status) {
}
