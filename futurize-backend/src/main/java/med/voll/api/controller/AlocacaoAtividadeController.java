package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.alocacaoAtividade.*;
import med.voll.api.atividade.DadosAtualizarAtividade;
import med.voll.api.atividade.DadosCadastroAtividade;
import med.voll.api.atividade.DadosListagemAtividade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Alocacao_atividade")
public class AlocacaoAtividadeController {

    @Autowired
    private AlocacaoAtividadeRepository repository;

    @CrossOrigin("*")
    @PostMapping
    @Transactional
    public void CadastroAlocacaoAtividade(@RequestBody @Valid DadosCadastroAtividadeAlocacaoAtividade dadosCadastroAtividadeAlocacaoAtividade){
        repository.save(new AlocacaoAtividade(dadosCadastroAtividadeAlocacaoAtividade));
    }

    @CrossOrigin("*")
    @GetMapping
    public List<DadosListagemAlocacaoAtividade> ListarAlocacaoAtividade(){
        return repository.findAll().stream().map(DadosListagemAlocacaoAtividade::new).toList();
    }

    @CrossOrigin("*")
    @PutMapping
    public void AtualizarAlocacaoAtividade(@RequestBody @Valid DadosAtualizarAlocacaoAtividade dadosAtualizarAlocacaoAtividade){
        var alocacaoAtividade = repository.getReferenceById(dadosAtualizarAlocacaoAtividade.id());
        alocacaoAtividade.atualizarInformacoes(dadosAtualizarAlocacaoAtividade);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void ExcluirAlocacaoAtividade(@PathVariable Long id){
        repository.deleteById(id);

    }
}
