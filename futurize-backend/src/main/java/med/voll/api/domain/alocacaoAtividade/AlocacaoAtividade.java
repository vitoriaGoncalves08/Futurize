package med.voll.api.domain.alocacaoAtividade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;


@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "alocacao_atividade")
@Table(name = "alocacao_atividade")
public class AlocacaoAtividade {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date data_inicio;
    private Date data_encerramento;
    private Estado estado;

    @ManyToOne
    @JoinColumn(name ="id_usuario")
    private Usuario usuario;

    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH})
    @JoinColumn(name = "id_atividade")
    private Atividade atividade;


    public AlocacaoAtividade(DadosCadastroAtividadeAlocacaoAtividade dadosCadastroAtividadeAlocacaoAtividade) {
        this.data_inicio = dadosCadastroAtividadeAlocacaoAtividade.data_inicio();
        this.data_encerramento = dadosCadastroAtividadeAlocacaoAtividade.data_encerramento();
        this.estado = dadosCadastroAtividadeAlocacaoAtividade.estado();
        this.atividade = dadosCadastroAtividadeAlocacaoAtividade.atividade();
        this.usuario = dadosCadastroAtividadeAlocacaoAtividade.usuario();
    }

    public void atualizarInformacoes(DadosAtualizarAlocacaoAtividade dadosAtualizarAlocacaoAtividade) {
        if(dadosAtualizarAlocacaoAtividade.data_inicio() != null){
            this.data_inicio = dadosAtualizarAlocacaoAtividade.data_inicio();
        }
        if(dadosAtualizarAlocacaoAtividade.data_encerramento() != null){
            this.data_encerramento = dadosAtualizarAlocacaoAtividade.data_encerramento();
        }
        if(dadosAtualizarAlocacaoAtividade.usuario() != null){
            this.usuario = dadosAtualizarAlocacaoAtividade.usuario();
        }
        if(dadosAtualizarAlocacaoAtividade.atividade() != null){
            this.atividade = dadosAtualizarAlocacaoAtividade.atividade();
        }
        if(dadosAtualizarAlocacaoAtividade.estado() != null){
            this.estado = dadosAtualizarAlocacaoAtividade.estado();
        }
    }
}
