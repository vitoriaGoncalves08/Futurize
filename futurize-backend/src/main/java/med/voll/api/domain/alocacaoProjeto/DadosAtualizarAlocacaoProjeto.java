package med.voll.api.domain.alocacaoProjeto;

import jakarta.validation.constraints.NotNull;
import med.voll.api.domain.projeto.Projeto;
import med.voll.api.domain.usuario.Usuario;

public record DadosAtualizarAlocacaoProjeto(
        @NotNull
        Long id,
        Projeto projeto,
        Usuario usuario) {

}
