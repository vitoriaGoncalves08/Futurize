package med.voll.api.domain.projeto;

import jakarta.validation.constraints.NotNull;
import med.voll.api.domain.enums.Estado;

import java.util.Date;

public record DadosAtualizarProjeto(
        @NotNull
        Long id,
        String titulo,
        Date encerramento,
        Estado estado,
        @NotNull
        Long gestor
) {
}
