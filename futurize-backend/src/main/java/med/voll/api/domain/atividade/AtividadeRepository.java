package med.voll.api.domain.atividade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
    List<Atividade> findByProjeto_Id(Long idProjeto);

    @Query("SELECT a.estado, COUNT(a) FROM atividade a WHERE a.responsavel.id = :userId GROUP BY a.estado")
    List<Object[]> countAtividadesByUserId(Long userId);

    @Query("SELECT a FROM atividade a WHERE a.responsavel.id = :userId")
    List<Atividade> totalAtividadesByUserId(Long userId);

    @Query("SELECT COUNT(a) FROM atividade a WHERE a.responsavel.id = :userId AND a.estado = 'EM_ANDAMENTO'")
    Long countAtividadesAndamentoByUserId(@Param("userId") Long userId);

    //Listagem de todas as atividades por projeto
    @Query("SELECT a FROM atividade a " +
            "JOIN a.projeto p " +
            "WHERE p.gestor = :userId " +
            "AND p.id = :projetoId")
    List<Object[]> findAtividadesByUsuarioAndProjeto(@Param("userId") Long userId, @Param("projetoId") Long projetoId);


    //Atividades Concluidas Por Projeto
    @Query(value = "SELECT " +
            "COUNT(CASE WHEN a.estado = 'CONCLUIDO' THEN 1 END) AS totalAtividadesConcluidas, " +
            "COUNT(a.id) AS totalAtividades " +
            "FROM atividade a " +
            "JOIN projeto p ON a.id_projeto = p.id " +
            "WHERE p.gestor = :userId " +
            "AND p.id = :projetoId",
            nativeQuery = true)
    Object[] countAtividadesConcluidasAndTotal(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Todas atividades
    @Query(value = "SELECT COUNT(a.id), a.estado " +
            "FROM atividade a " +
            "JOIN projeto p ON a.id_projeto = p.id " +
            "WHERE p.gestor = :userId " +
            "AND p.id = :projetoId " +
            "GROUP BY a.estado",
            nativeQuery = true)
    List<Object[]> countAtividadesByEstadoAndProjeto(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Total de atividades não iniciadas
    @Query(value = "SELECT COUNT(DISTINCT a.id) " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a ON a.id_projeto = ap.id_projeto " +
            "JOIN projeto p ON p.id = ap.id_projeto " +
            "WHERE p.gestor = :userId " +
            "AND ap.id_projeto = :projetoId " +
            "AND (a.estado = 'TOTAL_TAREFAS' OR a.estado = 'TAREFAS_A_FAZER')",
            nativeQuery = true)
    Long countAtividadesNaoIniciadas(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Total de atividades para concluir
    @Query(value = "SELECT COUNT(DISTINCT a.id) " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a ON a.id_projeto = ap.id_projeto " +
            "JOIN projeto p ON p.id = ap.id_projeto " +
            "WHERE p.gestor = :userId " +
            "AND ap.id_projeto = :projetoId " +
            "AND a.estado <> 'CONCLUIDO'",
            nativeQuery = true)
    Long countAtividadesNaoConcluidas(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Total de atividades refeitas
    @Query(value = "SELECT COUNT(DISTINCT a.id) " +
            "FROM alocacao_projeto ap " +
            "JOIN atividade a ON a.id_projeto = ap.id_projeto " +
            "JOIN projeto p ON p.id = ap.id_projeto " +
            "WHERE p.gestor = :userId " +
            "AND ap.id_projeto = :projetoId " +
            "AND a.quantidade_retrabalho > 0",
            nativeQuery = true)
    Long countAtividadesRefeitas(@Param("userId") Long userId, @Param("projetoId") Long projetoId);

    //Integrante com mais entregas
    //Contar atividades concluídas por usuário
    @Query(value = "SELECT u.id AS idUsuario, u.nome AS nomeUsuario, u.email AS emailUsuario, " +
            "COUNT(a.id) AS totalAtividadesConcluidas " +
            "FROM alocacao_projeto ap " +
            "JOIN projeto p ON p.id = ap.id_projeto " +
            "JOIN atividade a ON a.id_projeto = p.id " +
            "JOIN usuario u ON u.id = a.responsavel " +
            "WHERE a.estado = 'CONCLUIDO' " +
            "AND p.gestor = :userId " +
            "AND ap.id_projeto = :projetoId " +
            "GROUP BY u.id, u.nome, u.email",
            nativeQuery = true)
    List<Object[]> findAtividadesConcluidasPorUsuario(@Param("userId") Long userId, @Param("projetoId") Long projetoId);


    @Query("SELECT DISTINCT atividade.Id , atividade.mensagemNotificacao " +
            "FROM atividade atividade " +
            "JOIN atividade.projeto projeto " +
            "LEFT JOIN alocacao_projeto ap " +
            "WHERE ap.usuario.id = :userId OR projeto.gestor = :userId")
    List<Object[]> findAtividadeIdsAndMensagensByUsuarioOuGestor(@Param("userId") Long userId);

}
