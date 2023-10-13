package med.voll.api.projeto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import med.voll.api.usuario.DadosCadastroUsuario;
import med.voll.api.usuario.Usuario;

import java.util.Date;

public record DadosCadastroProjeto(
        @NotBlank
        String titulo,
        @NotNull
        Date inicio,
        @NotNull
        Date encerramento,
        @NotNull
        Estado estado
) {

}
