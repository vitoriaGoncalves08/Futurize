package med.voll.api.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;


public record DadosCadastroUsuario(
        @NotBlank
        String nome,
        @NotBlank
        @Email
        String email,
        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[@#$%^&+=!_])(?=.*\\d)[A-Za-z@#$%^&+=!_\\d]{7,25}$", message = "Senha inválida")
        String senha
        ) {



}
