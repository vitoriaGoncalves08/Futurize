package med.voll.api.atividade;

import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record DadosAtualizarAtividade(
        @NotNull
        Long id,
        String titulo,
        String descricaco,
        Date encerramento,
        Estado estado,
        Dificuldade dificuldade,
        Prioridade prioridade,
        String tempo_execucao
) {
}
