package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.atividade.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    @GetMapping
    public Page<DadosListagemAtividade> ListarAtividades(@PageableDefault(sort = {}) Pageable paginacao){
        return repository.findAllByAtivoTrue(paginacao).map(DadosListagemAtividade::new);
    }

    @Transactional
    @PutMapping
    public void AtualizarAtividade(@RequestBody @Valid DadosAtualizarAtividade dadosAtualizarAtividade){
        var atividade = repository.getReferenceById(dadosAtualizarAtividade.id());
        atividade.atualizarInformacoes(dadosAtualizarAtividade);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void ExcluirAtividade(@PathVariable Long id){
        var atividade = repository.getReferenceById(id);
        atividade.excluir();
    }


//    @CrossOrigin("*")
//    @GetMapping("/status")
//    public List<Atividade> encontrarPorStatus(String status){
//        return AtividadeRepository.findByStatus(status);
//    }
}
