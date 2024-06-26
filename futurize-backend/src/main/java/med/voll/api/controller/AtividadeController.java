package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.domain.atividade.*;
import med.voll.api.domain.atividade.Atividade;
import med.voll.api.domain.atividade.AtividadeRepository;
import med.voll.api.domain.atividade.DadosListagemAtividade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("Atividade")
public class AtividadeController {
    @Autowired
    private AtividadeRepository repository;

    @CrossOrigin("*")
    @PostMapping
    @Transactional
    public void CadastrarAtividade(@RequestBody @Valid DadosCadastroAtividade dadosCadastroAtividade){
        repository.save(new Atividade(dadosCadastroAtividade));
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public List<DadosListagemAtividade> listarAtividade(@PathVariable Long id){
        return repository.findByProjeto_Id(id)
                .stream()
                .map(DadosListagemAtividade::new)
                .collect(Collectors.toList());
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity AtualizarAtividade(@PathVariable Long id, @RequestBody @Valid DadosAtualizarAtividade dadosAtualizarAtividade){
        var atividade = repository.getReferenceById(id);
        atividade.atualizarInformacoes(dadosAtualizarAtividade);
        return ResponseEntity.ok(new DadosListagemAtividade(atividade));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity ExcluirAtividade(@PathVariable Long id){
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    //PAGINAÇÂO

/*    @CrossOrigin("*")
    @GetMapping
    public Page<DadosListagemAtividade> ListarAtividades(@PageableDefault(sort = {}) Pageable paginacao){
        return repository.findAllByAtivoTrue(paginacao).map(DadosListagemAtividade::new);
    }*/

/*    @DeleteMapping("/{id}")
    @Transactional
    public void ExcluirAtividade(@PathVariable Long id){
        var atividade = repository.getReferenceById(id);
        atividade.excluir();
    }*/


//    @CrossOrigin("*")
//    @GetMapping("/status")
//    public List<Atividade> encontrarPorStatus(String status){
//        return AtividadeRepository.findByStatus(status);
//    }
}
