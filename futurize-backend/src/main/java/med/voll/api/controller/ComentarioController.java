package med.voll.api.controller;

import med.voll.api.domain.comentario.DadosCadastroComentario;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("Comentario")
public class ComentarioController {

    public void CadastrarComentario(@RequestBody DadosCadastroComentario dadosCadastroComentario){
        System.out.println(dadosCadastroComentario);
    }
}
