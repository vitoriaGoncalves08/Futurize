package med.voll.api.atividade;

import jakarta.validation.constraints.NotNull;
import med.voll.api.usuario.Usuario;

import java.util.Date;

public record DadosAtualizarAtividade(
        @NotNull
        Long id,
        String titulo,
        String descricaco,
        Date encerramento,
        Estado estado,
        Dificuldade dificuldade,
        int prioridade,
        String tempo_execucao,
        Usuario responsavel

) {
}
