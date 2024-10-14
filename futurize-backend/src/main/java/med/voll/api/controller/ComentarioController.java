package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.domain.comentario.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("Comentario")
public class ComentarioController {
    @Autowired
    private ComentarioRepository repository;

    @CrossOrigin("*")
    @PostMapping
    @Transactional
    public void CadastrarComentario(@RequestBody @Valid DadosCadastroComentario dadosCadastroComentario){
        repository.save(new Comentario(dadosCadastroComentario));
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public List<DadosListagemComentario> listarComentario(@PathVariable Long id){
        return repository.findByAtividadeComentada_Id(id)
                .stream()
                .map(DadosListagemComentario::new)
                .collect(Collectors.toList());
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity AtualizarComentario(@PathVariable Long id, @RequestBody @Valid DadosAtualizarComentario dadosAtualizarComentario){
        var comentario = repository.getReferenceById(id);
        comentario.atualizarComentario(dadosAtualizarComentario);
        return ResponseEntity.ok(new DadosListagemComentario(comentario));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity ExcluirComentario(@PathVariable Long id){
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
