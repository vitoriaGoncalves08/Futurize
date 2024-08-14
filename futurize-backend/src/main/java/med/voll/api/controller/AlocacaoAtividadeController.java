package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.domain.alocacaoAtividade.*;
import med.voll.api.domain.alocacaoAtividade.AlocacaoAtividade;
import med.voll.api.domain.alocacaoAtividade.AlocacaoAtividadeRepository;
import med.voll.api.domain.usuario.DadosListagemUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<DadosListagemAlocacaoAtividade>> ListarAlocacaoAtividade(){
        List<DadosListagemAlocacaoAtividade> alocacaoAtividades = repository.findAll().stream().map(DadosListagemAlocacaoAtividade::new).toList();
        return ResponseEntity.ok(alocacaoAtividades);
    }

    @CrossOrigin("*")
    @PutMapping
    public ResponseEntity AtualizarAlocacaoAtividade(@RequestBody @Valid DadosAtualizarAlocacaoAtividade dadosAtualizarAlocacaoAtividade){
        var alocacaoAtividade = repository.getReferenceById(dadosAtualizarAlocacaoAtividade.id());
        alocacaoAtividade.atualizarInformacoes(dadosAtualizarAlocacaoAtividade);
        return ResponseEntity.ok(new DadosListagemAlocacaoAtividade(alocacaoAtividade));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity ExcluirAlocacaoAtividade(@PathVariable Long id){
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
