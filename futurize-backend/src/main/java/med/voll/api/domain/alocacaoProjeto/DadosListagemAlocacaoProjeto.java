package med.voll.api.domain.alocacaoProjeto;

import med.voll.api.domain.projeto.Projeto;
import med.voll.api.domain.usuario.Usuario;

public record DadosListagemAlocacaoProjeto(Long id, Projeto projeto, Usuario usuario) {

    public DadosListagemAlocacaoProjeto(AlocacaoProjeto alocacaoProjeto){
        this(alocacaoProjeto.getId(), alocacaoProjeto.getProjeto(), alocacaoProjeto.getUsuario());
    }
}
