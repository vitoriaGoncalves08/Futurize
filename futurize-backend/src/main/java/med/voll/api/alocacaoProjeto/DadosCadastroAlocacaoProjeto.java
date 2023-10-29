package med.voll.api.alocacaoProjeto;

import med.voll.api.projeto.Projeto;
import med.voll.api.usuario.Usuario;

public record DadosCadastroAlocacaoProjeto(

        Projeto projeto,

        Usuario usuario
) {

}
