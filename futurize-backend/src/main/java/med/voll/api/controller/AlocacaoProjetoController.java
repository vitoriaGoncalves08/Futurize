package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.alocacaoProjeto.*;
import med.voll.api.projeto.Projeto;
import med.voll.api.projeto.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("Alocacao_projeto")
public class AlocacaoProjetoController {
    @Autowired
    private AlocacaoProjetoRepository repository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @CrossOrigin("*")
    @PostMapping
    @Transactional
    public void CadastrarAlocacaoProjeto(@RequestBody @Valid DadosCadastroAlocacaoProjeto dadosCadastroAlocacaoProjeto){
        repository.save(new AlocacaoProjeto(dadosCadastroAlocacaoProjeto));
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public List<DadosListagemAlocacaoProjeto> ListarAlocacaoProjeto(@PathVariable Long id){
        Projeto projeto = projetoRepository.findById(id).orElse(null);
        if (projeto != null) {
            return repository.findByProjeto(projeto)
                    .stream()
                    .map(DadosListagemAlocacaoProjeto::new)
                    .collect(Collectors.toList());
        } else {
            // Lide com o caso em que o Projeto com o id fornecido não foi encontrado
            return Collections.emptyList(); // Ou outra ação apropriada
        }
    }

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    @Transactional
    public void ExcluirAlocacaoProjeto(@PathVariable Long id){
        repository.deleteById(id);
    }

    @CrossOrigin("*")
    @PutMapping
    @Transactional
    public void AtualizarAlocacaoProjeto(@RequestBody @Valid DadosAtualizarAlocacaoProjeto dadosAtualizarAlocacaoProjeto){
        var alocacaoProjeto = repository.getReferenceById(dadosAtualizarAlocacaoProjeto.id());
        alocacaoProjeto.AtualizarALocacaoProjeto(dadosAtualizarAlocacaoProjeto);
    }
}
