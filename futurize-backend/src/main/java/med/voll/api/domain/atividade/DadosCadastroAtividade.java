package med.voll.api.domain.atividade;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import med.voll.api.domain.usuario.Usuario;
import med.voll.api.domain.projeto.Projeto;

import java.util.Date;

public record DadosCadastroAtividade(
        @NotBlank
        String titulo,
        @NotBlank
        String descricao,
        @NotNull
        Date inicio,
        @NotNull
        Date encerramento,
        @NotNull
        Estado estado,
        @NotNull
        Dificuldade dificuldade,
        @NotNull
        int prioridade,
        @NotBlank
        String tempo_execucao,
        @NotNull
        Projeto projeto,
        @NotNull
        Usuario responsavel

 ) {
}
