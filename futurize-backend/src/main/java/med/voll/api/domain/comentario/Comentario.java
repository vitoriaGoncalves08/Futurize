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

    private String descricaoComentario;

    private Date dataComentario;

    @ManyToOne
    @JoinColumn(name = "usuario_caaaomentario")
    private Usuario usuarioComentario ;

    @ManyToOne
    @JoinColumn(name = "atividade_comentada")
    private Atividade atividadeComentada;

    public Comentario(DadosCadastroComentario dadosCadastroComentario){
        this.descricaoComentario = dadosCadastroComentario.descricaoComentario();
        this.dataComentario = dadosCadastroComentario.dataComentario();
        this.usuarioComentario = dadosCadastroComentario.usuarioComentario();
        this.atividadeComentada = dadosCadastroComentario.atividadeComentada();
    }

    public void atualizarComentario(DadosAtualizarComentario dadosAtualizarComentario){
        if(dadosAtualizarComentario.descricaoComentario() != null){
            this.descricaoComentario = dadosAtualizarComentario.descricaoComentario();
        }
        if(dadosAtualizarComentario.dataComentario() != null){
            this.dataComentario = dadosAtualizarComentario.dataComentario();
        }
        if(dadosAtualizarComentario.usuarioComentario() != null){
            this.usuarioComentario = dadosAtualizarComentario.usuarioComentario();
        }
        if(dadosAtualizarComentario.atividadeComentada() != null){
            this.atividadeComentada = dadosAtualizarComentario.atividadeComentada();
        }
    }
}
