package med.voll.api.cargo;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.projeto.DadosListagemProjeto;
import med.voll.api.projeto.Projeto;
import med.voll.api.usuario.Usuario;

@Entity(name = "cargo")
@Table(name = "alocacao_projeto")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Getter
public class Alocacao_projeto {

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

    public Alocacao_projeto(DadosCadastroCargoProjeto dadosCadastroCargoProjeto) {
        this.ativo = true;
        this.cargo = dadosCadastroCargoProjeto.cargo();
        this.projeto = dadosCadastroCargoProjeto.projeto();
        this.usuario = dadosCadastroCargoProjeto.usuario();
    }

    public void excluir() {
        this.ativo = false;
    }



}
