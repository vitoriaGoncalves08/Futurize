package med.voll.api.domain.projeto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import med.voll.api.domain.enums.Estado;

import java.util.Date;

public record DadosCadastroProjeto(
        @NotBlank
        String titulo,
        @NotNull
        Date inicio,
        @NotNull
        Date encerramento,
        @NotNull
        Estado estado,
        @NotNull
        Long gestor
) {

}
