package med.voll.api.usuario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.stream.DoubleStream;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
   Usuario findByEmail(String email);
   Usuario findAllById(Long id);



//    Page<Usuario> findAllByAtivoTrue(Pageable paginacao);
}
