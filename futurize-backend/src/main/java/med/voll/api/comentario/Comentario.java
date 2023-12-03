package med.voll.api.comentario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.atividade.Atividade;
import med.voll.api.usuario.Usuario;
import org.hibernate.annotations.Cascade;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity(name = "comentario")
@Table(name = "comentario")
public class Comentario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String titulo;
    private String descricao;
    private Date data;
    @OneToMany
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    @OneToMany
    @JoinColumn(name = "id_atividade")
    private Atividade atividadecomentada;

    public Comentario(DadosCadastroComentario dadosCadastroComentario){
        this.titulo = dadosCadastroComentario.titulo();
        this.descricao = dadosCadastroComentario.descricao();
        this.data = dadosCadastroComentario.data();
        this.usuario= dadosCadastroComentario.usuario();
        this.atividadecomentada = dadosCadastroComentario.atividadecomentada();
    }

    public void atualizarInformacoes(DadosAtualizarComentario dadosAtualizarComentario) {
        if(dadosAtualizarComentario.titulo() != null){
            this.titulo = dadosAtualizarComentario.titulo();
        }
        if(dadosAtualizarComentario.descricao() != null){
            this.descricao = dadosAtualizarComentario.descricao();
        }
        if(dadosAtualizarComentario.data() != null){
            this.data = dadosAtualizarComentario.data();
        }
        if(dadosAtualizarComentario.usuario() != null){
            this.usuario = dadosAtualizarComentario.usuario();
        }
        if(dadosAtualizarComentario.atividadecomentada() != null) {
            this.atividadecomentada = dadosAtualizarComentario.atividadecomentada();
        }

    }

}
