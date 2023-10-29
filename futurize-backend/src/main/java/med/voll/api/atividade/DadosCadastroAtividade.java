package med.voll.api.atividade;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import med.voll.api.projeto.DadosCadastroProjeto;
import med.voll.api.projeto.Projeto;
import med.voll.api.usuario.DadosCadastroUsuario;

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
        Prioridade prioridade,
        @NotBlank
        String tempo_execucao,
        @NotNull
        Projeto projeto

 ) {
}
