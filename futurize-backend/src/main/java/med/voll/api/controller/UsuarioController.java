package med.voll.api.controller;

import med.voll.api.usuario.DadosCadastroUsuario;
import med.voll.api.usuario.Usuario;
import med.voll.api.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("Usuario")
public class UsuarioController {
    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    @Transactional
    public void CadastrarUsuario(@RequestBody DadosCadastroUsuario dados) {
        repository.save(new Usuario(dados));
    }
}