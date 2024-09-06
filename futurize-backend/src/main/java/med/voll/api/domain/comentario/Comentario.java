package med.voll.api.domain.comentario;


import jakarta.persistence.*;
import lombok.*;
import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Setter
@Entity(name = "comentario")
@Table(name = "comentario")
public class Comentario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo_comentario;

    private String descricao_comentario;

    private Date data_comentario;

    @ManyToOne
    @JoinColumn(name = "usuario_comentario")
    private Usuario usuario_comentario ;

    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH})
    @JoinColumn(name = "atividade_comentada")
    private Atividade atividadeComentada;

    public Comentario(DadosCadastroComentario dadosCadastroComentario){
        this.titulo_comentario = dadosCadastroComentario.titulo_comentario();
        this.descricao_comentario = dadosCadastroComentario.descricao_comentario();
        this.data_comentario = dadosCadastroComentario.data_comentario();
        this.usuario_comentario = dadosCadastroComentario.usuario_comentario();
        this.atividadeComentada = dadosCadastroComentario.atividadeComentada();
    }

    public void atualizarComentario(DadosAtualizarComentario dadosAtualizarComentario){
        if(dadosAtualizarComentario.titulo_comentario() != null){
            this.titulo_comentario = dadosAtualizarComentario.titulo_comentario();
        }
        if(dadosAtualizarComentario.descricao_comentario() != null){
            this.descricao_comentario = dadosAtualizarComentario.descricao_comentario();
        }
        if(dadosAtualizarComentario.data_comentario() != null){
            this.data_comentario = dadosAtualizarComentario.data_comentario();
        }
        if(dadosAtualizarComentario.usuario_comentario() != null){
            this.usuario_comentario = dadosAtualizarComentario.usuario_comentario();
        }
        if(dadosAtualizarComentario.atividadeComentada() != null){
            this.atividadeComentada = dadosAtualizarComentario.atividadeComentada();
        }
    }
}
