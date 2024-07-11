package med.voll.api.domain.alocacaoProjeto;

import med.voll.api.domain.projeto.Projeto;
import med.voll.api.domain.usuario.Usuario;

public record DadosCadastroAlocacaoProjeto(

        Projeto projeto,

        Usuario usuario
) {

}
