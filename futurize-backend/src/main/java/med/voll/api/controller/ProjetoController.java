package med.voll.api.controller;

import med.voll.api.projeto.DadosCadastroProjeto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("Projeto")
public class ProjetoController {
    @PostMapping
    public void CadastrarProjeto(@RequestBody DadosCadastroProjeto dadosCadastroProjeto){
        System.out.println(dadosCadastroProjeto);
    }
}
