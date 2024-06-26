package med.voll.api.controller;
import jakarta.validation.Valid;
import med.voll.api.domain.projeto.*;
import med.voll.api.domain.projeto.DadosAtualizarProjeto;
import med.voll.api.domain.projeto.DadosListagemProjeto;
import med.voll.api.domain.projeto.Projeto;
import med.voll.api.domain.projeto.ProjetoRepository;
import med.voll.api.domain.usuario.DadosAtualizarUsuario;
import med.voll.api.domain.usuario.DadosListagemUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


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
    @GetMapping("/porUsuario/{id}")
    public List<DadosListagemProjeto> listarProjeto(@PathVariable Long id) {
        return repository.findByGestor(id)
                .stream()
                .map(DadosListagemProjeto::new)
                .collect(Collectors.toList());
    }

    @PutMapping()
    @Transactional
    public ResponseEntity atualizarProjeto(@Valid @RequestBody DadosAtualizarProjeto dadosAtualizarProjeto) {
        var projeto = repository.getReferenceById(dadosAtualizarProjeto.id());
        projeto.atualizarInformacoes(dadosAtualizarProjeto);
        return ResponseEntity.ok(new DadosListagemProjeto(projeto));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity ExcluirProjeto(@PathVariable Long id){
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    //PAGINAÇÂO
/*
    @CrossOrigin("*")
    @GetMapping
    public Page<DadosListagemProjeto> listarProjeto(@PageableDefault(sort = {"encerramento"}) Pageable paginacao){
        return repository.findAllByAtivoTrue(paginacao).map(DadosListagemProjeto::new);
    }
    @PutMapping
    @Transactional
    public void atualizarProjeto(@RequestBody @Valid DadosAtualizarProjeto dadosAtualizarProjeto){
        var projeto = repository.getReferenceById(dadosAtualizarProjeto.id());
        projeto.atualizarInformacoes(dadosAtualizarProjeto);
    }
    @DeleteMapping("/{id}")
    @Transactional
    public void ExcluirProjeto(@PathVariable Long id){
        var projeto = repository.getReferenceById(id);
        projeto.excluir();
    }
*/
//    @CrossOrigin("*")
//    @DeleteMapping("/delete/{id}")
//    public void excluirProjeto(@PathVariable Long id) {
//        Optional<Projeto> projetoOptional = repository.findById(id);
//        if (projetoOptional.isPresent()) {
//            repository.delete(projetoOptional.get());
//        } else {
//            // Tratar o caso em que o projeto com o ID especificado não foi encontrado
//            throw new ProjetoNaoEncontradoException("Projeto não encontrado para o ID: " + id);
//        }
//    }
//    public class ProjetoNaoEncontradoException extends RuntimeException {
//
//        public ProjetoNaoEncontradoException(String mensagem) {
//            super(mensagem);
//        }
//    }
}