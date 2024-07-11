package med.voll.api.domain.atividade;

import jakarta.validation.constraints.NotNull;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;

public record DadosAtualizarAtividade(
        @NotNull
        Long id,
        String titulo,
        String descricao,
        Date encerramento,
        Estado estado,
        Dificuldade dificuldade,
        int prioridade,
        String tempo_execucao,
        Usuario responsavel

) {
}
