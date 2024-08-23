package med.voll.api.domain.comentario;

import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;

public record DadosListagemComentario(Long id, String descricacoComentario, Date dataComentario, Usuario usuarioComentario, Atividade atividadeComentario ) {
    public DadosListagemComentario(Comentario comentario){
        this(comentario.getId(), comentario.getDescricaoComentario(), comentario.getDataComentario(), comentario.getUsuarioComentario(), comentario.getAtividadeComentada());
    }
}
