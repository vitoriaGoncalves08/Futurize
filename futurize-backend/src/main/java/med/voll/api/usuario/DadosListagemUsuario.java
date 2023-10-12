package med.voll.api.usuario;

public record DadosListagemUsuario(String nome, String email, String senha) {

    public DadosListagemUsuario(Usuario usuario){
        this(usuario.getNome(),usuario.getEmail(), usuario.getSenha());
    }

}
