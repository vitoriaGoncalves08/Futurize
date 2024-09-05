package med.voll.api.domain.comentario;

import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;

public record DadosListagemComentario(Long id, String tituloComentario, String descricacoComentario, Date dataComentario, Usuario usuarioComentario, Atividade atividadeComentario ) {
    public DadosListagemComentario(Comentario comentario){
        this(comentario.getId(), comentario.getTitulo_comentario(), comentario.getDescricao_comentario(), comentario.getData_comentario(), comentario.getUsuario_comentario(), comentario.getAtividade_comentada());
    }
}
