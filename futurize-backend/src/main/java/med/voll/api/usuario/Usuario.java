package med.voll.api.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "usuarios")
@Entity(name = "usuario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private Boolean ativo;

    public Usuario(DadosCadastroUsuario dados) {
        this.ativo = true;
        this.nome = dados.nome();
        this.email = dados.email();
        this.senha = dados.senha();
    }


    public void atualizarInformacoes(DadosAtualizarUsuario dadosAtualizarUsuario) {
        if(dadosAtualizarUsuario.nome() != null){
            this.nome = dadosAtualizarUsuario.nome();
        }
        if(dadosAtualizarUsuario.email() != null){
            this.email = dadosAtualizarUsuario.email();
        }
        if(dadosAtualizarUsuario.senha() != null){
            this.senha = dadosAtualizarUsuario.senha();
        }
    }

    public void excluir() {
        this.ativo = false;
    }
}
