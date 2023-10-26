package med.voll.api.alocacaoProjeto;

import jakarta.validation.constraints.NotNull;
import med.voll.api.projeto.Projeto;
import med.voll.api.usuario.Usuario;

public record DadosAtualizarAlocacaoProjeto(
        @NotNull
        Long id,
        Cargo cargo,
        Projeto projeto,
        Usuario usuario) {

}
