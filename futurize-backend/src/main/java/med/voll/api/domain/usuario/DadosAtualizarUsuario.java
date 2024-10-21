package med.voll.api.domain.usuario;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosAtualizarUsuario(
        Long id,
        String nome,
        String email,
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[@#$%^&+=!_])(?=.*\\d)[A-Za-z@#$%^&+=!_\\d]{7,25}$", message = "Senha inválida")
        String senha) {

}
