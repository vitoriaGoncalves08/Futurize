package med.voll.api.domain.projeto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

    List<Projeto> findByGestor(Long gestor);
    Optional<Projeto> findById(Long id);
    //PAGINAÇÃO
//    Page<Projeto> findAllByAtivoTrue(Pageable paginacao);
}