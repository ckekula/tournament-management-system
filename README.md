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
