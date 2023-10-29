package med.voll.api.alocacaoProjeto;

import med.voll.api.projeto.Projeto;
import med.voll.api.usuario.Usuario;

public record DadosListagemAlocacaoProjeto(Long id, Projeto projeto, Usuario usuario) {

    public DadosListagemAlocacaoProjeto(AlocacaoProjeto alocacaoProjeto){
        this(alocacaoProjeto.getId(), alocacaoProjeto.getProjeto(), alocacaoProjeto.getUsuario());
    }
}
