package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.projeto.DadosCadastroProjeto;
import med.voll.api.projeto.Projeto;
import med.voll.api.projeto.ProjetoRepository;
import med.voll.api.usuario.Usuario;
import med.voll.api.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("Projeto")
public class ProjetoController {

    @Autowired
    private ProjetoRepository repository;
    @PostMapping
    @Transactional
    public void CadastrarProjeto(@RequestBody @Valid DadosCadastroProjeto dadosCadastroProjeto){
        repository.save(new Projeto(dadosCadastroProjeto));
    }
}
