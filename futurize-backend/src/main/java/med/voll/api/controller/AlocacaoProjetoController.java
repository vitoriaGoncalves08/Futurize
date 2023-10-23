package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.cargo.Alocacao_projeto;
import med.voll.api.cargo.CargoProjetoRepository;
import med.voll.api.cargo.DadosCadastroCargoProjeto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Alocar")
public class AlocacaoProjetoController {
    @Autowired
    private CargoProjetoRepository repository;

    @PostMapping
    @Transactional
    public void CadastrarCargoProjeto(@RequestBody @Valid DadosCadastroCargoProjeto dadosCadastroCargoProjeto){
        repository.save(new Alocacao_projeto(dadosCadastroCargoProjeto));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void ExcluirAlocacaoProjeto(@PathVariable Long id){
        var alocacaoProjeto = repository.getReferenceById(id);
        alocacaoProjeto.excluir();
    }
}
