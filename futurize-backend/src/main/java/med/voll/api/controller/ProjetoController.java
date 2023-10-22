package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.projeto.DadosCadastroProjeto;
import med.voll.api.projeto.DadosListagemProjeto;
import med.voll.api.projeto.Projeto;
import med.voll.api.projeto.ProjetoRepository;
import med.voll.api.usuario.Usuario;
import med.voll.api.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("Projeto")
public class ProjetoController {

    @Autowired
    private ProjetoRepository repository;

    @CrossOrigin("*")
    @PostMapping
    @Transactional
    public void CadastrarProjeto(@RequestBody @Valid DadosCadastroProjeto dadosCadastroProjeto){
        repository.save(new Projeto(dadosCadastroProjeto));
    }

    @CrossOrigin("*")
    @GetMapping
    public List<DadosListagemProjeto> listarProjeto(){
        return repository.findAll().stream().map(DadosListagemProjeto::new).toList();
    }
    @CrossOrigin("*")
    @DeleteMapping("/delete/{id}")
    public void excluirProjeto(@PathVariable Long id) {
        Optional<Projeto> projetoOptional = repository.findById(id);
        if (projetoOptional.isPresent()) {
            repository.delete(projetoOptional.get());
        } else {
            // Tratar o caso em que o projeto com o ID especificado não foi encontrado
            throw new ProjetoNaoEncontradoException("Projeto não encontrado para o ID: " + id);
        }
    }
    public class ProjetoNaoEncontradoException extends RuntimeException {

        public ProjetoNaoEncontradoException(String mensagem) {
            super(mensagem);
        }
    }
}
