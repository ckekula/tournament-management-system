# Tournament Management System

A highly flexible and scalable tournament management system designed to handle any sport, format, scoring system, or point system. Built with PostgreSQL and a dynamic data pipeline, this system can adapt to various tournament structures, from individual events to complex multi-stage competitions.

---

## Features

- **Universal Adaptability**: Supports any sport, format, or scoring system.
- **Dynamic Schema**: Uses PostgreSQL `JSONB` for flexible data storage.
- **Hierarchical Structure**: Manages users, organizations, competitions, tournaments, events, stages, rounds, and matches.
- **Rule-Based Scoring**: Configurable scoring rules for matches, stages, and events.
- **Standings Calculation**: Automatically calculates rankings at every level (matches, groups, events, tournaments, and competitions).
- **Historical Tracking**: Maintains versioned records of all standings and results.
- **Tiebreaker Handling**: Customizable tiebreaker rules for complex scenarios.
- **Multi-Format Support**: Handles round-robin, single/double elimination, time-based rankings, and more.

---

## Schema Overview

The system is built on a PostgreSQL database with the following core tables:

- **Users**: Represents system users.
- **Organizations**: Represents organizations that create competitions.
- **Competitions**: Contains tournaments for specific activities.
- **Tournaments**: Represents a specific activity (e.g., basketball, tennis).
- **Events**: Represents subcategories within a tournament (e.g., men's 5x5 basketball).
- **Stages**: Represents stages within an event (e.g., group stage, knockout stage).
- **Rounds**: Represents rounds within a stage (e.g., round 1, semifinals).
- **Matches**: Represents individual matches within a round.
- **Teams**: Represents teams participating in an event.
- **Participants**: Represents individual participants within teams.
- **Scoring Rules**: Stores configurable scoring and ranking rules.

---

## Data Pipeline

The system processes data through a hierarchical pipeline:

1. **Match Result Ingestion**: Captures raw performance metrics.
2. **Immediate Match Outcomes**: Applies match-level scoring rules.
3. **Stage Aggregation**: Calculates group standings and stage progression.
4. **Event Rollup**: Determines final event standings and awards points.
5. **Tournament Aggregation**: Sums points across all events.
6. **Competition Rollup**: Aggregates tournament results to determine overall winners.

---

## Getting Started

### Prerequisites

- PostgreSQL 12+
- Python 3.8+ (for the calculation engine)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tournament-management-system.git
   cd tournament-management-system
   ```
2. Set up the PostgreSQL database:
  ```bash
   psql -U postgres -f schema.sql
  ```
3. Install Python dependencies:
  ```bash
  pip install -r requirements.txt
  ```

4. Configure the environment:
  ```bash
  cp .env.example .env
  # Edit .env with your database credentials
  ```

5. Run the system:
  ```bash
  python main.py
  ```

## Configuration

### Scoring Rules

Scoring rules are defined in the `scoring_rules` table using JSONB. Example:

```json
{
  "condition": {"stage_type": "group"},
  "calculation": {
    "formula": "SUM(match_points)",
    "group_by": ["group_id"],
    "sort": {"field": "points", "order": "DESC"}
  }
}
```

### Event Configuration

Events are configured using the `config` field in the `events` table. Example for a swimming event:

```json
{
  "type": "individual",
  "scoring_type": "time",
  "categories": ["men", "women"],
  "performance_schema": {
    "type": "object",
    "properties": {
      "time": {"type": "number"},
      "disqualified": {"type": "boolean"}
    }
  }
}
```

---

## Example Use Case

### Creating a Basketball Tournament

1. Create a tournament:
   ```sql
   INSERT INTO tournaments (id, competition_id, activity_type)
   VALUES ('tournament-1', 'competition-1', 'basketball');
   ```

2. Add an event:
   ```sql
   INSERT INTO events (id, tournament_id, config)
   VALUES ('event-1', 'tournament-1', '{
     "type": "team",
     "scoring_type": "points",
     "categories": ["men", "women"]
   }');
   ```

3. Define scoring rules:
   ```sql
   INSERT INTO scoring_rules (id, event_id, rule_type, condition, calculation)
   VALUES ('rule-1', 'event-1', 'match_points', '{}', '{
     "formula": "win ? 3 : draw ? 1 : 0",
     "output_field": "points"
   }');
   ```

4. Add teams and participants:
   ```sql
   INSERT INTO teams (id, event_id, members)
   VALUES ('team-1', 'event-1', '{"participant_ids": ["player-1", "player-2"]}');
   ```

5. Record match results:
   ```sql
   INSERT INTO matches (id, round_id, results)
   VALUES ('match-1', 'round-1', '{
     "team_a_score": 85,
     "team_b_score": 76
   }');
   ```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by the need for a universal tournament management solution.
- Built with PostgreSQL, Python, and a lot of coffee.

---

For questions or support, please open an issue or contact the maintainers.
