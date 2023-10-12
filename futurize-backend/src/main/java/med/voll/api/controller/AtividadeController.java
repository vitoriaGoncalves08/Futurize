package med.voll.api.controller;

import med.voll.api.atividade.DadosCadastroAtividade;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("Atividade")
public class AtividadeController {

    @PostMapping
    public void CadastrarAtividade(@RequestBody DadosCadastroAtividade dadosCadastroAtividade){
        System.out.println(dadosCadastroAtividade);
    }

}
