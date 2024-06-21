package med.voll.api.domain.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
   //Usuario findByEmail(String email);
   Usuario findAllById(Long id);

   UserDetails findByEmail(String email);


//    Page<Usuario> findAllByAtivoTrue(Pageable paginacao);
}
