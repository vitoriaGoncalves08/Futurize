package med.voll.api.domain.atividade;

import lombok.*;
import med.voll.api.domain.usuario.Usuario;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Setter
public class AtividadeNotificacaoDTO {

    private Long idAtividade;
    private String titulo;
    private String descricao;
    private Date inicio;
    private Date encerramento;
    private String estado;
    private Long idProjeto;
    private Usuario responsavel;
    private String mensagemNotificacao;

}
