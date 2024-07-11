package med.voll.api.domain.usuario;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizarUsuario(
        @NotNull
        Long id,
        String nome,
        String email,
        String senha) {

}
