package med.voll.api.controller;

import med.voll.api.domain.alocacaoProjeto.AlocacaoProjetoRepository;
import med.voll.api.domain.atividade.AtividadeRepository;
import med.voll.api.domain.projeto.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dashboard-projeto")
public class DashboardProjetoController {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private AlocacaoProjetoRepository aloProjetoRepository;

    //Listagem de todas as atividades por projeto
    @GetMapping("/listagem-das-atividades-por-projeto/{userId}/{projetoId}")
    public ResponseEntity<List<Object[]>> getListagemAtividadesPorProjeto(@PathVariable Long userId, @PathVariable Long projetoId) {
        List<Object[]> total = atividadeRepository.findAtividadesByUsuarioAndProjeto(userId, projetoId);
        return ResponseEntity.ok(total);
    }

    //Atividades Concluidas Por Projeto
    @GetMapping("/atividades-concluidas-por-projeto/{userId}/{projetoId}")
    public ResponseEntity<Object[]> getAtividadesConcluidasPorProjeto(@PathVariable Long userId, @PathVariable Long projetoId) {
        Object[] total = atividadeRepository.countAtividadesConcluidasAndTotal(userId, projetoId);
        return ResponseEntity.ok(total);
    }

    //Todas atividades
    @GetMapping("/total-atividades-por-projeto/{userId}/{projetoId}")
    public ResponseEntity<List<Object[]>> getTotalAtividadesPorProjeto(@PathVariable Long userId, @PathVariable Long projetoId) {
        List<Object[]> total = atividadeRepository.countAtividadesByEstadoAndProjeto(userId, projetoId);
        return ResponseEntity.ok(total);
    }

    //Total de atividades não iniciadas
    @GetMapping("/total-atividades-nao-iniciadas-por-projeto/{userId}/{projetoId}")
    public ResponseEntity<Long> getTotalAtividadesNaoIniciadas(@PathVariable Long userId, @PathVariable Long projetoId) {
        Long total = atividadeRepository.countAtividadesNaoIniciadas(userId, projetoId);
        return ResponseEntity.ok(total);
    }

    //Total de atividades para concluir
    @GetMapping("/total-atividades-nao-concluidas/{userId}/{projetoId}")
    public ResponseEntity<Long> getTotalAtividadesNaoConcluidas(@PathVariable Long userId, @PathVariable Long projetoId) {
        Long total = atividadeRepository.countAtividadesNaoConcluidas(userId, projetoId);
        return ResponseEntity.ok(total);
    }

    //Total de atividades refeitas
    @GetMapping("/total-atividades-refeitas/{userId}/{projetoId}")
    public ResponseEntity<Long> getTotalAtividadesRefeitas(@PathVariable Long userId, @PathVariable Long projetoId) {
        Long total = atividadeRepository.countAtividadesRefeitas(userId, projetoId);
        return ResponseEntity.ok(total);
    }

    //Integrante com mais entregas
    @GetMapping("/usuario-mais-atividades-concluidas/{projetoId}")
    public ResponseEntity<List<Object[]>> getUsuarioMaisAtividadesConcluidas(@PathVariable Long projetoId) {
        // 1. Buscar as atividades concluídas por cada usuário
        List<Object[]> usuariosAtividades = atividadeRepository.findAtividadesConcluidasPorUsuario(projetoId);

        // 2. Encontrar o valor máximo de atividades concluídas
        Long maxAtividadesConcluidas = usuariosAtividades.stream()
                .map(row -> (Long) row[3]) // Total de atividades concluídas está no índice 3
                .max(Long::compare)
                .orElse(0L); // Caso não haja resultados, retornamos 0 como valor padrão

        // 3. Filtrar os usuários que têm o valor máximo de atividades concluídas
        List<Object[]> result = usuariosAtividades.stream()
                .filter(row -> ((Long) row[3]).equals(maxAtividadesConcluidas)) // Comparar com o valor máximo
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

}
