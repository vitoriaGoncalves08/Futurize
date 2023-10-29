package med.voll.api.alocacaoProjeto;

import med.voll.api.projeto.Projeto;
import med.voll.api.usuario.Usuario;

public record DadosCadastroCargoProjeto(

        Cargo cargo,


        Projeto projeto,


        Usuario usuario


) {

}
