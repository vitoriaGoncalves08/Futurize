package med.voll.api.domain.usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioToken {

    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String token;
}
