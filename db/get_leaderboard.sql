SELECT p.id, p.username, s.games_played, s.money_won
FROM players p
INNER JOIN stats s ON p.id = s.player_id
ORDER BY money_won desc
LIMIT 10;