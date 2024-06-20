package med.voll.api.domain.usuario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
   Usuario findByEmail(String email);
   Usuario findAllById(Long id);



//    Page<Usuario> findAllByAtivoTrue(Pageable paginacao);
}
