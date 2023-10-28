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

    @Enumerated(EnumType.STRING)
    private Cargo cargo;

    @ManyToOne
    @JoinColumn(name = "id_projeto")
    private Projeto projeto;
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    private Boolean ativo;

    public AlocacaoProjeto(DadosCadastroCargoProjeto dadosCadastroCargoProjeto) {
        this.ativo = true;
        this.cargo = dadosCadastroCargoProjeto.cargo();
        this.projeto = dadosCadastroCargoProjeto.projeto();
        this.usuario = dadosCadastroCargoProjeto.usuario();
    }

    public void AtualizarALocacaoProjeto(DadosAtualizarAlocacaoProjeto dadosAtualizarAlocacaoProjeto) {
        if (dadosAtualizarAlocacaoProjeto.cargo() != null){
            this.cargo = dadosAtualizarAlocacaoProjeto.cargo();
        }
        if(dadosAtualizarAlocacaoProjeto.projeto() != dadosAtualizarAlocacaoProjeto.projeto()){
            this.projeto = dadosAtualizarAlocacaoProjeto.projeto();
        }
        if(dadosAtualizarAlocacaoProjeto.usuario() != null){
            this.usuario = dadosAtualizarAlocacaoProjeto.usuario();
        }
    }
}
