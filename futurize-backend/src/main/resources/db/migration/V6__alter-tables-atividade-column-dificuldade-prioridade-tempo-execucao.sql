ALTER TABLE atividade ADD  dificuldade varchar(30);
UPDATE atividade SET dificuldade = 'SIMPLES';

ALTER TABLE atividade ADD  prioridade varchar(30);
UPDATE atividade SET prioridade = 'BAIXA';

ALTER TABLE atividade ADD tempo_execucao varchar(40);
UPDATE atividade SET tempo_execucao = '00-00-20';

