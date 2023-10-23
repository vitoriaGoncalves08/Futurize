package med.voll.api.atividade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.stream.DoubleStream;

public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
    List<Atividade> findByStatus(Status status);

    Page<Atividade> findAllByAtivoTrue(Pageable paginacao);
}
