package med.voll.api.domain.atividade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
    List<Atividade> findByProjeto_Id(Long idProjeto);

    @Query("SELECT a.estado, COUNT(a) FROM atividade a WHERE a.responsavel.id = :userId GROUP BY a.estado")
    List<Object[]> countAtividadesByUserId(Long userId);

    @Query("SELECT COUNT(a) FROM atividade a WHERE a.responsavel.id = :userId AND a.estado = 'EM_ANDAMENTO'")
    Long countAtividadesAndamentoByUserId(@Param("userId") Long userId);

    //Listagem de todas as atividades por projeto
    @Query("SELECT a " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a " +
            "JOIN ap.projeto p " +
            "JOIN ap.usuario u " +
            "WHERE ap.usuario.id = :userId " +
            "AND ap.projeto.id = :projetoId")
    List<Object[]> findAtividadesByUsuarioAndProjeto(@Param("userId") Long userId, @Param("projetoId") Long projetoId);


    //Atividades Concluidas Por Projeto
    @Query("SELECT " +
            "COUNT(CASE WHEN a.estado = 'CONCLUIDO' THEN 1 END) AS totalAtividadesConcluidas, " +
            "COUNT(a.Id) AS totalAtividades " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a " +
            "JOIN ap.projeto p " +
            "WHERE ap.usuario.id = :userId " +
            "AND ap.projeto.id = :projetoId")
    Object[] countAtividadesConcluidasAndTotal(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Todas atividades
    @Query("SELECT COUNT(a.Id), a.estado " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a " +
            "JOIN ap.projeto p " +
            "JOIN ap.usuario u " +
            "WHERE ap.usuario.id = :userId " +
            "AND ap.projeto.id = :projetoId " +
            "GROUP BY a.estado")
    List<Object[]> countAtividadesByEstadoAndProjeto(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Total de atividades não iniciadas
    @Query("SELECT COUNT(a.Id) " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a " +
            "JOIN ap.projeto p " +
            "JOIN ap.usuario u " +
            "WHERE ap.usuario.id = :userId " +
            "AND ap.projeto.id = :projetoId " +
            "AND (a.estado = 'TOTAL_TAREFAS' OR a.estado = 'TAREFAS_A_FAZER')")
    Long countAtividadesNaoIniciadas(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Total de atividades para concluir
    @Query("SELECT COUNT(a.Id) " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a " +
            "JOIN ap.projeto p " +
            "JOIN ap.usuario u " +
            "WHERE ap.usuario.id = :userId " +
            "AND ap.projeto.id = :projetoId " +
            "AND a.estado <> 'CONCLUIDO'")
    Long countAtividadesNaoConcluidas(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Total de atividades refeitas
    @Query("SELECT COUNT(a.Id) " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a " +
            "JOIN ap.projeto p " +
            "JOIN ap.usuario u " +
            "WHERE ap.usuario.id = :userId " +
            "AND ap.projeto.id = :projetoId " +
            "AND a.quantidade_retrabalho > 0")
    Long countAtividadesRefeitas(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Integrante com mais entregas
    //Contar atividades concluídas por usuário
    @Query("SELECT u.id AS idUsuario, u.nome AS nomeUsuario, u.email AS emailUsuario, COUNT(a.Id) AS totalAtividadesConcluidas " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a " +
            "JOIN a.responsavel u " +
            "WHERE a.estado = 'CONCLUIDO' " +
            "AND ap.projeto.id = :projetoId " +
            "GROUP BY u.id, u.nome, u.email")
    List<Object[]> findAtividadesConcluidasPorUsuario(@Param("projetoId") Long projetoId);


}
