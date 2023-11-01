package med.voll.api.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import med.voll.api.alocacaoProjeto.*;
import med.voll.api.projeto.Projeto;
import med.voll.api.projeto.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> CadastrarAlocacaoProjeto(@RequestBody @Valid DadosCadastroAlocacaoProjeto dadosCadastroAlocacaoProjeto) {
        // Verifique se já existe uma alocação com o mesmo projeto e usuário
        AlocacaoProjeto existingAlocacao = repository.findByProjetoAndUsuario(dadosCadastroAlocacaoProjeto.projeto(), dadosCadastroAlocacaoProjeto.usuario());

        if (existingAlocacao != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Já existe uma alocação com o mesmo projeto e usuário.");
        } else {
            // Caso não exista uma alocação com os mesmos valores, você pode salvar a nova alocação
            repository.save(new AlocacaoProjeto(dadosCadastroAlocacaoProjeto));
            return ResponseEntity.status(HttpStatus.CREATED).body("A alocação foi criada com sucesso.");
        }
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
