package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.projeto.DadosCadastroProjeto;
import med.voll.api.projeto.DadosListagemProjeto;
import med.voll.api.projeto.Projeto;
import med.voll.api.projeto.ProjetoRepository;
import med.voll.api.usuario.Usuario;
import med.voll.api.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Projeto")
public class ProjetoController {

    @Autowired
    private ProjetoRepository repository;
    @CrossOrigin(origins = "http://localhost:5173/", allowedHeaders = {"GET", "POST", "PUT", "DELETE"})
    @PostMapping
    @Transactional
    public void CadastrarProjeto(@RequestBody @Valid DadosCadastroProjeto dadosCadastroProjeto){
        repository.save(new Projeto(dadosCadastroProjeto));
    }
    @CrossOrigin(origins = "http://localhost:5173/", allowedHeaders = {"GET", "POST", "PUT", "DELETE"})
    @GetMapping
    public List<DadosListagemProjeto> listarProjeto(){
        return repository.findAll().stream().map(DadosListagemProjeto::new).toList();
    }

    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable(); // Habilitar CORS e desabilitar CSRF
    }
    
}
