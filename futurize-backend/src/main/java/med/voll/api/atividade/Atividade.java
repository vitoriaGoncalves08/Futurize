package med.voll.api.atividade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.projeto.Projeto;
import med.voll.api.usuario.Usuario;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
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
    @Enumerated(EnumType.STRING)
    private Prioridade prioridade;
    private String tempo_execucao;
    @ManyToOne
    @JoinColumn(name = "id_projeto")
    private Projeto projeto;
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
    }

    public void atualizarInformacoes(DadosAtualizarAtividade dadosAtualizarAtividade) {
        if(dadosAtualizarAtividade.titulo() != null){
            this.titulo = dadosAtualizarAtividade.titulo();
        }
        if(dadosAtualizarAtividade.descricaco() != null){
            this.descricao = dadosAtualizarAtividade.descricaco();
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
        if(dadosAtualizarAtividade.prioridade() != null){
            this.prioridade = dadosAtualizarAtividade.prioridade();
        }
        if(dadosAtualizarAtividade.prioridade() != null){
            this.tempo_execucao = dadosAtualizarAtividade.tempo_execucao();
        }

    }

    //Paginação
    public void excluir() {
        this.ativo = false;
    }
}
