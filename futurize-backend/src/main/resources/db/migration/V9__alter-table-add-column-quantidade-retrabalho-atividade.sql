ALTER TABLE futurize.atividade
ADD COLUMN quantidade_retrabalho INT DEFAULT 0;

UPDATE futurize.atividade
SET quantidade_retrabalho = 0
WHERE quantidade_retrabalho IS NULL;