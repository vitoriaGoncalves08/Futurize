package med.voll.api.domain.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

   Usuario findByEmail(@Param("email") String email);

   Usuario findAllById(Long id);

   UserDetails findUserDetailsByEmail(String email);

}
