package med.voll.api.projeto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.stream.DoubleStream;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

    List<Projeto> findByGestor(Long gestor);

    //PAGINAÇÃO
//    Page<Projeto> findAllByAtivoTrue(Pageable paginacao);
}