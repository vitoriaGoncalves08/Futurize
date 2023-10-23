package med.voll.api.atividade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity(name = "atividade")
@Table(name = "Atividade")
public class Atividade {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    private String titulo;
    private String descricao;
    private Date inicio;
    private Date encerramento;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Boolean ativo;

    public Atividade(DadosCadastroAtividade dadosCadastroAtividade){
        this.ativo = true;
        this.titulo = dadosCadastroAtividade.titulo();
        this.descricao = dadosCadastroAtividade.descricao();
        this.inicio = dadosCadastroAtividade.inicio();
        this.encerramento = dadosCadastroAtividade.encerramento();
        this.status = dadosCadastroAtividade.status();
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
        if(dadosAtualizarAtividade.status() != null){
            this.status = dadosAtualizarAtividade.status();
        }

    }

    public void excluir() {
        this.ativo = false;
    }
}
