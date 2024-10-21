package med.voll.api.controller;
import jakarta.validation.Valid;
import med.voll.api.domain.usuario.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import med.voll.api.domain.usuario.Usuario;
import med.voll.api.domain.usuario.UsuarioRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("Usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<?> CadastrarUsuario(@RequestBody @Valid DadosCadastroUsuario dados, UriComponentsBuilder uriBuilder) {
        // Verificar se o e-mail já está cadastrado
        Usuario usuarioExistente = repository.findByEmail(dados.email());
        if (usuarioExistente != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado");
        }

        // Criar o usuário e salvar
        Usuario usuario = new Usuario(dados);
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        repository.save(usuario);

        var uri = uriBuilder.path("/Usuario/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosListagemUsuario(usuario));
    }

    @GetMapping
    public ResponseEntity<List<DadosListagemUsuario>> listarUsuario() {
        List<DadosListagemUsuario> usuarios = repository.findAll().stream()
                .map(DadosListagemUsuario::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosListagemUsuario> detalhar(@PathVariable Long id){
        Usuario usuario = repository.getReferenceById(id);
        return ResponseEntity.ok(new DadosListagemUsuario(usuario));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> AtualizarUsuario(@PathVariable Long id, @RequestBody @Valid DadosAtualizarUsuario dadosAtualizarUsuario) {
        // Verifica se o usuário com o ID existe
        Usuario usuario = repository.findById(id).orElse(null);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        // Verifica se o e-mail já está em uso por outro usuário
        Usuario usuarioExistente = repository.findByEmail(dadosAtualizarUsuario.email());
        if (usuarioExistente != null && !usuarioExistente.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado por outro usuário");
        }

        // Atualiza os dados do usuário
        usuario.setNome(dadosAtualizarUsuario.nome());
        usuario.setEmail(dadosAtualizarUsuario.email());

        // Criptografa a nova senha se for diferente da senha atual
        if (!usuario.getSenha().equals(dadosAtualizarUsuario.senha())) {
            usuario.setSenha(passwordEncoder.encode(dadosAtualizarUsuario.senha()));
        }

        // Salva as atualizações no banco de dados
        repository.save(usuario);

        // Retorna o status de sucesso e os dados atualizados
        return ResponseEntity.ok(new DadosListagemUsuario(usuario));
    }


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity ExcluirUsuario(@PathVariable Long id){
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // @CrossOrigin("*")
    //@PostMapping("/login")
    // public ResponseEntity<Object> login(@RequestBody Usuario data) {
    //    Usuario usuario = repository.findByEmail(data.getEmail());

    //    if (usuario != null && usuario.getSenha().equals(data.getSenha())) {
    //        // Adicione o ID do usuário no corpo da resposta
    //        return ResponseEntity.ok(usuario.getId());
    //    } else if (usuario == null) {
    //        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não cadastrado");
    //    } else {
    //        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorretos");
    //     }
    //}
}