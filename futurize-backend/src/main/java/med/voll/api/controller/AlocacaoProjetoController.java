package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.alocacaoProjeto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Alocacao_projeto")
public class AlocacaoProjetoController {
    @Autowired
    private AlocacaoProjetoRepository repository;

    @CrossOrigin("*")
    @PostMapping
    @Transactional
    public void CadastrarCargoProjeto(@RequestBody @Valid DadosCadastroAlocacaoProjeto dadosCadastroAlocacaoProjeto){
        repository.save(new AlocacaoProjeto(dadosCadastroAlocacaoProjeto));
    }

    @CrossOrigin("*")
    @GetMapping
    public List<DadosListagemAlocacaoProjeto> ListarAlocacaoProjeto(){
         return repository.findAll().stream().map(DadosListagemAlocacaoProjeto :: new).toList();
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
