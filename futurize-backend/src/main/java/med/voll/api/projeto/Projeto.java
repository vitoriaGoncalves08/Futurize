package med.voll.api.projeto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity(name = "Projeto")
@Table(name = "Projeto")
public class Projeto {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private Date inicio;
    private Date encerramento;
    @Enumerated(EnumType.STRING)
    private Estado estado;

    public Projeto(DadosCadastroProjeto dadosCadastroProjeto) {
        this.titulo = dadosCadastroProjeto.titulo();
        this.inicio = dadosCadastroProjeto.inicio();
        this.encerramento = dadosCadastroProjeto.encerramento();
        this.estado = dadosCadastroProjeto.estado();
    }
}
