package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.comentario.*;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void CadastrarAtividade(@RequestBody @Valid DadosCadastroComentario dadosCadastroComentario){
        repository.save(new Comentario(dadosCadastroComentario));
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public List<DadosListagemComentario> listarComentario(@PathVariable Long id){
        return repository.findByComentario_Id(id)
                .stream()
                .map(DadosListagemComentario::new)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void ExcluirComentario(@PathVariable Long id){
        repository.deleteById(id);

    }

    @Transactional
    @PutMapping("/{id}")
    public void AtualizarComentario(@PathVariable Long id, @RequestBody @Valid DadosAtualizarComentario dadosAtualizarComentario){
        var comentario = repository.getReferenceById(id);
        comentario.atualizarInformacoes(dadosAtualizarComentario);
    }

}
