package med.voll.api.domain.alocacaoAtividade;

import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;

public record DadosListagemAlocacaoAtividade(Long id, Date data_inicio, Date data_encerramento, Estado estado, Usuario usuario, Atividade atividade) {

    public DadosListagemAlocacaoAtividade(AlocacaoAtividade alocacaoAtividade){
        this(alocacaoAtividade.getId(), alocacaoAtividade.getData_inicio(), alocacaoAtividade.getData_encerramento(), alocacaoAtividade.getEstado(), alocacaoAtividade.getUsuario(), alocacaoAtividade.getAtividade() );
    }
}
