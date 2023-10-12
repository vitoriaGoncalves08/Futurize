package med.voll.api.cargo;

import jakarta.validation.constraints.NotBlank;
import med.voll.api.projeto.Projeto;
import med.voll.api.usuario.Usuario;

public record DadosCadastroCargoProjeto(

        Cargo cargo,


        Projeto projeto,


        Usuario usuario


) {

}
