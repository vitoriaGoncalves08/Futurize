package med.voll.api.domain.atividade;

import jakarta.persistence.*;
import lombok.*;
import med.voll.api.domain.projeto.Projeto;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Setter
@Entity(name = "atividade")
@Table(name = "atividade")
public class Atividade {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String titulo;

    private String descricao;

    private Date inicio;

    private Date encerramento;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Enumerated(EnumType.STRING)
    private Dificuldade dificuldade;

    private int prioridade;

    private String tempo_execucao;

    @ManyToOne
    @JoinColumn(name = "id_projeto")
    private Projeto projeto;

    @ManyToOne
    @JoinColumn(name = "responsavel")
    private Usuario responsavel;

    private Boolean ativo;


    public Atividade(DadosCadastroAtividade dadosCadastroAtividade){
        this.ativo = true;
        this.titulo = dadosCadastroAtividade.titulo();
        this.descricao = dadosCadastroAtividade.descricao();
        this.inicio = dadosCadastroAtividade.inicio();
        this.encerramento = dadosCadastroAtividade.encerramento();
        this.estado = dadosCadastroAtividade.estado();
        this.dificuldade = dadosCadastroAtividade.dificuldade();
        this.prioridade = dadosCadastroAtividade.prioridade();
        this.tempo_execucao = dadosCadastroAtividade.tempo_execucao();
        this.projeto = dadosCadastroAtividade.projeto();
        this.responsavel = dadosCadastroAtividade.responsavel();
    }

    public void atualizarInformacoes(DadosAtualizarAtividade dadosAtualizarAtividade) {
        if(dadosAtualizarAtividade.titulo() != null){
            this.titulo = dadosAtualizarAtividade.titulo();
        }
        if(dadosAtualizarAtividade.descricao() != null){
            this.descricao = dadosAtualizarAtividade.descricao();
        }
        if(dadosAtualizarAtividade.encerramento() != null){
            this.encerramento = dadosAtualizarAtividade.encerramento();
        }
        if(dadosAtualizarAtividade.estado() != null){
            this.estado = dadosAtualizarAtividade.estado();
        }
        if(dadosAtualizarAtividade.dificuldade() != null){
            this.dificuldade = dadosAtualizarAtividade.dificuldade();
        }
        if(dadosAtualizarAtividade.prioridade() != 0){
            this.prioridade = dadosAtualizarAtividade.prioridade();
        }
        if(dadosAtualizarAtividade.tempo_execucao() != null){
            this.tempo_execucao = dadosAtualizarAtividade.tempo_execucao();
        }
        if(dadosAtualizarAtividade.responsavel() != null){
            this.responsavel = dadosAtualizarAtividade.responsavel();
        }

    }

    //Paginação
    public void excluir() {
        this.ativo = false;
    }
}
