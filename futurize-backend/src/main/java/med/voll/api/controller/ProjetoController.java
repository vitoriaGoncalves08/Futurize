package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.projeto.*;
import med.voll.api.usuario.Usuario;
import med.voll.api.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> atualizarProjeto(@PathVariable Long id, @RequestBody DadosAtualizarProjeto dadosAtualizarProjeto) {
        var projeto = repository.getReferenceById(dadosAtualizarProjeto.id());
        projeto.atualizarInformacoes(dadosAtualizarProjeto);
        return ResponseEntity.ok().build();
    }

//    @PutMapping("/atualizar/{id}")
//    @Transactional
//    public ResponseEntity<Void> atualizarProjeto(@PathVariable Long id, @RequestBody @Valid DadosAtualizarProjeto dadosAtualizarProjeto) {
//        try {
//            var projeto = repository.getReferenceById(id);
//            projeto.atualizarInformacoes(dadosAtualizarProjeto);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

    @DeleteMapping("/{id}")
    @Transactional
    public void ExcluirProjeto(@PathVariable Long id){
        repository.deleteById(id);
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
