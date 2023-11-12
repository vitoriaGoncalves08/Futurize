package med.voll.api.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import med.voll.api.alocacaoProjeto.*;
import med.voll.api.projeto.Projeto;
import med.voll.api.projeto.ProjetoRepository;
import med.voll.api.usuario.Usuario;
import med.voll.api.usuario.UsuarioRepository;
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

    @Autowired
    private UsuarioRepository usuarioRepository;

    @CrossOrigin("*")
    @PostMapping
    @Transactional
    public ResponseEntity<String> CadastrarAlocacaoProjeto(@RequestBody @Valid DadosCadastroAlocacaoProjeto dadosCadastroAlocacaoProjeto) {
        AlocacaoProjeto existingAlocacao = repository.findByProjetoAndUsuario(dadosCadastroAlocacaoProjeto.projeto(), dadosCadastroAlocacaoProjeto.usuario());

        if (existingAlocacao != null) {
            // Modifique a resposta de conflito para incluir informações sobre o conflito
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Já existe uma alocação com o mesmo projeto (" + dadosCadastroAlocacaoProjeto.projeto().getId() + ") e usuário (" + dadosCadastroAlocacaoProjeto.usuario().getId() + ").");
        } else {
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
    @GetMapping("/porUser/{idUsuario}")
    public List<DadosListagemAlocacaoProjeto> ListarAlocacaoProjetoPorUser(@PathVariable Long idUsuario) {
        Usuario usuario = usuarioRepository.findAllById(idUsuario);
        if (usuario != null) {
            return repository.findByUsuario(usuario)
                    .stream()
                    .map(DadosListagemAlocacaoProjeto::new)
                    .collect(Collectors.toList());
        } else {
            // Lidar com o caso em que o usuário com o ID fornecido não foi encontrado
            return Collections.emptyList(); // Ou outra ação apropriada
        }
    }


    @CrossOrigin("*")
    @DeleteMapping("/{idProjeto}/{idUsuario}")
    @Transactional
    public void ExcluirAlocacaoProjeto(@PathVariable Long idProjeto, @PathVariable Long idUsuario) {
        AlocacaoProjeto alocacaoProjeto = repository.findByIdProjetoAndIdUsuario(idProjeto, idUsuario);
        if (alocacaoProjeto != null) {
            repository.delete(alocacaoProjeto);
        } else {
            // Lidar com o caso em que a alocação não foi encontrada
            // Você pode lançar uma exceção, retornar um status 404, etc.
        }
    }

    @CrossOrigin("*")
    @PutMapping
    @Transactional
    public void AtualizarAlocacaoProjeto(@RequestBody @Valid DadosAtualizarAlocacaoProjeto dadosAtualizarAlocacaoProjeto){
        var alocacaoProjeto = repository.getReferenceById(dadosAtualizarAlocacaoProjeto.id());
        alocacaoProjeto.AtualizarALocacaoProjeto(dadosAtualizarAlocacaoProjeto);
    }
}
