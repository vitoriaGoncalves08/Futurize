package med.voll.api.alocacaoProjeto;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.projeto.Projeto;
import med.voll.api.usuario.Usuario;

@Entity(name = "cargo")
@Table(name = "alocacao_projeto")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Getter
public class AlocacaoProjeto {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_projeto")
    private Projeto projeto;
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    private Boolean ativo;

    public AlocacaoProjeto(DadosCadastroAlocacaoProjeto dadosCadastroAlocacaoProjeto) {
        this.ativo = true;
        this.projeto = dadosCadastroAlocacaoProjeto.projeto();
        this.usuario = dadosCadastroAlocacaoProjeto.usuario();
    }

    public void AtualizarALocacaoProjeto(DadosAtualizarAlocacaoProjeto dadosAtualizarAlocacaoProjeto) {
        if(dadosAtualizarAlocacaoProjeto.projeto() != dadosAtualizarAlocacaoProjeto.projeto()){
            this.projeto = dadosAtualizarAlocacaoProjeto.projeto();
        }
        if(dadosAtualizarAlocacaoProjeto.usuario() != null){
            this.usuario = dadosAtualizarAlocacaoProjeto.usuario();
        }
    }
}
