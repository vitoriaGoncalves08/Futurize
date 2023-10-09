package med.voll.api.projeto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import med.voll.api.usuario.DadosCadastroUsuario;

import java.util.Date;

public record DadosCadastroProjeto(
        @NotBlank
        String titulo,
        String descricao,
        @NotBlank
        Date inicio,
        @NotBlank
        Date encerramento,
        @NotNull
        Estado estado) {

}
