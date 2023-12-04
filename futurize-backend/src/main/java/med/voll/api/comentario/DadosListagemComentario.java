package med.voll.api.comentario;

import med.voll.api.alocacaoProjeto.AlocacaoProjeto;
import med.voll.api.atividade.Atividade;
import med.voll.api.atividade.DadosCadastroAtividade;
import med.voll.api.usuario.DadosCadastroUsuario;
import med.voll.api.usuario.Usuario;

import java.util.Date;

public record DadosListagemComentario(Long id, String titulo, String descricao, Date data_comentario, Usuario usuario, Atividade atividadecomentada) {

    public DadosListagemComentario(Comentario comentario){
        this(comentario.getId(), comentario.getTitulo(), comentario.getDescricao(), comentario.getData_comentario(), comentario.getUsuario(), comentario.getAtividadecomentada());
    }
}
