package med.voll.api.controller;

import jakarta.validation.Valid;
import med.voll.api.projeto.DadosListagemProjeto;
import med.voll.api.usuario.DadosCadastroUsuario;
import med.voll.api.usuario.DadosListagemUsuario;
import med.voll.api.usuario.Usuario;
import med.voll.api.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Usuario")
public class UsuarioController {
    @Autowired
    private UsuarioRepository repository;
    @CrossOrigin("*")
    @PostMapping
    @Transactional
    public void CadastrarUsuario(@RequestBody @Valid DadosCadastroUsuario dados) {
        repository.save(new Usuario(dados));
    }
    @CrossOrigin("*")
    @GetMapping
    public List<DadosListagemUsuario> listarUsuario() {
        return repository.findAll().stream().map(DadosListagemUsuario::new).toList();
    }

    @CrossOrigin("*")
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Usuario data) {
        Usuario usuario = repository.findByEmail(data.getEmail());

        if (usuario != null && usuario.getSenha().equals(data.getSenha())) {
            return ResponseEntity.ok(usuario);
        } else if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não cadastrado");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorretos");
        }
    }
}