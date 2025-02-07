-- User and Organization
CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE organization (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id BIGINT NOT NULL UNIQUE REFERENCES "user"(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB NOT NULL DEFAULT '{}'
);

-- Competition Structure
CREATE TABLE competition (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    organization_id BIGINT NOT NULL REFERENCES organization(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Activity (Sport/Game) Configuration
CREATE TABLE activity (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL, -- 'sport', 'academic', 'esport', etc.
    classification_rules JSONB NOT NULL, -- Gender, age, weight rules
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournament (
    id BIGSERIAL PRIMARY KEY,
    competition_id BIGINT NOT NULL REFERENCES competition(id),
    activity_id BIGINT NOT NULL REFERENCES activity(id),
    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event (
    id BIGSERIAL PRIMARY KEY,
    tournament_id BIGINT NOT NULL REFERENCES tournament(id),
    name VARCHAR(255) NOT NULL,
    classification JSONB NOT NULL, -- gender, age group, weight class
    format VARCHAR(50) NOT NULL, -- 'individual', 'team', 'both'
    scoring_config JSONB NOT NULL, -- Scoring rules and metrics
    participant_roles JSONB NOT NULL, -- Different roles in the activity
    team_size_rules JSONB NOT NULL DEFAULT '{}', -- Min/max team sizes
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stage (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES event(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'group', 'knockout', 'league'
    sequence INT NOT NULL, -- Order of stages
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_group (
    id BIGSERIAL PRIMARY KEY,
    stage_id BIGINT NOT NULL REFERENCES stage(id),
    name VARCHAR(255) NOT NULL,
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE round (
    id BIGSERIAL PRIMARY KEY,
    stage_id BIGINT NOT NULL REFERENCES stage(id),
    group_id BIGINT REFERENCES event_group(id),
    name VARCHAR(255) NOT NULL,
    sequence INT NOT NULL,
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Team and Participant Management
CREATE TABLE team (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organization(id),
    event_id BIGINT NOT NULL REFERENCES event(id),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    attributes JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE participant (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(50) NOT NULL,
    attributes JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE team_participant (
    id BIGSERIAL PRIMARY KEY,
    team_id BIGINT NOT NULL REFERENCES team(id),
    participant_id BIGINT NOT NULL REFERENCES participant(id),
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    attributes JSONB NOT NULL DEFAULT '{}'
);

-- Match and Scoring System
CREATE TABLE match (
    id BIGSERIAL PRIMARY KEY,
    round_id BIGINT NOT NULL REFERENCES round(id),
    sequence INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled',
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE match_participant (
    id BIGSERIAL PRIMARY KEY,
    match_id BIGINT NOT NULL REFERENCES match(id),
    participant_id BIGINT REFERENCES participant(id),
    team_id BIGINT REFERENCES team(id),
    role VARCHAR(50) NOT NULL,
    scores JSONB NOT NULL DEFAULT '{}',
    statistics JSONB NOT NULL DEFAULT '{}',
    CONSTRAINT entity_check CHECK (
        (participant_id IS NOT NULL AND team_id IS NULL) OR
        (participant_id IS NULL AND team_id IS NOT NULL)
    )
);

-- Indexes
CREATE INDEX idx_participant_attributes ON participant USING gin(attributes jsonb_path_ops);
CREATE INDEX idx_team_attributes ON team USING gin(attributes jsonb_path_ops);
CREATE INDEX idx_event_classification ON event USING gin(classification jsonb_path_ops);
CREATE INDEX idx_match_participant_scores ON match_participant USING gin(scores jsonb_path_ops);
CREATE INDEX idx_match_participant_statistics ON match_participant USING gin(statistics jsonb_path_ops);

-- Example activity configuration
INSERT INTO activity (
    name, 
    category, 
    format, 
    scoring_config,
    participant_roles,
    team_size_rules,
    classification_rules
) VALUES (
    'Basketball 5x5',
    'sport',
    'team',
    '{
        "team_metrics": ["points", "fouls", "timeouts"],
        "player_metrics": {
            "points": {"type": "numeric", "default": 0},
            "rebounds": {"type": "numeric", "default": 0},
            "assists": {"type": "numeric", "default": 0},
            "steals": {"type": "numeric", "default": 0},
            "blocks": {"type": "numeric", "default": 0},
            "fouls": {"type": "numeric", "max": 5}
        }
    }',
    '{
        "player": {"max_per_team": 12},
        "coach": {"max_per_team": 3}
    }',
    '{
        "min_players": 5,
        "max_players": 12,
        "active_players": 5
    }',
    '{
        "gender": ["male", "female"],
        "age_groups": ["U12", "U16", "U18", "senior"],
        "weight_class": false
    }'
);

-- Point System Configuration
CREATE TABLE point_system (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    organization_id BIGINT REFERENCES organization(id),
    rules JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Example point system rules:
-- {
--     "positions": {
--         "1": 100,
--         "2": 80,
--         "3": 60,
--         "4": 50,
--         "5-8": 30,
--         "9-16": 15
--     },
--     "bonus": {
--         "world_record": 20,
--         "tournament_record": 10
--     }
-- }

-- Add point system references to existing tables
ALTER TABLE competition ADD COLUMN point_system_id BIGINT REFERENCES point_system(id);
ALTER TABLE tournament ADD COLUMN point_system_id BIGINT REFERENCES point_system(id);
ALTER TABLE event ADD COLUMN point_system_id BIGINT REFERENCES point_system(id);

-- Rankings and Points Tables
CREATE TABLE event_ranking (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES event(id),
    team_id BIGINT REFERENCES team(id),
    participant_id BIGINT REFERENCES participant(id),
    final_position INT,
    points NUMERIC NOT NULL DEFAULT 0,
    ranking_details JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT entity_check CHECK (
        (team_id IS NOT NULL AND participant_id IS NULL) OR
        (team_id IS NULL AND participant_id IS NOT NULL)
    )
);

CREATE TABLE tournament_ranking (
    id BIGSERIAL PRIMARY KEY,
    tournament_id BIGINT NOT NULL REFERENCES tournament(id),
    organization_id BIGINT NOT NULL REFERENCES organization(id),
    final_position INT,
    total_points NUMERIC NOT NULL DEFAULT 0,
    points_breakdown JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competition_ranking (
    id BIGSERIAL PRIMARY KEY,
    competition_id BIGINT NOT NULL REFERENCES competition(id),
    organization_id BIGINT NOT NULL REFERENCES organization(id),
    final_position INT,
    total_points NUMERIC NOT NULL DEFAULT 0,
    points_breakdown JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Functions for point calculation and ranking

-- Calculate points for a team/participant in an event
CREATE OR REPLACE FUNCTION calculate_event_points(
    p_event_id BIGINT,
    p_position INT
) RETURNS NUMERIC AS $$
DECLARE
    v_point_system_id BIGINT;
    v_rules JSONB;
    v_points NUMERIC;
BEGIN
    -- Get point system rules
    SELECT point_system_id INTO v_point_system_id FROM event WHERE id = p_event_id;
    SELECT rules INTO v_rules FROM point_system WHERE id = v_point_system_id;
    
    -- Calculate points based on position
    SELECT COALESCE(
        (v_rules->'positions'->p_position::text)::NUMERIC,
        (
            SELECT (v_rules->'positions'->key)::NUMERIC
            FROM jsonb_object_keys(v_rules->'positions') key
            WHERE key LIKE '%-%'
            AND p_position BETWEEN 
                split_part(key, '-', 1)::INT AND 
                split_part(key, '-', 2)::INT
            LIMIT 1
        ),
        0
    ) INTO v_points;
    
    RETURN v_points;
END;
$$ LANGUAGE plpgsql;

-- Update tournament rankings based on event results
CREATE OR REPLACE FUNCTION update_tournament_rankings(p_tournament_id BIGINT) RETURNS VOID AS $$
BEGIN
    -- Clear existing rankings
    DELETE FROM tournament_ranking WHERE tournament_id = p_tournament_id;
    
    -- Calculate new rankings
    INSERT INTO tournament_ranking (
        tournament_id,
        organization_id,
        total_points,
        points_breakdown
    )
    SELECT 
        p_tournament_id,
        t.organization_id,
        SUM(er.points),
        jsonb_object_agg(
            e.name,
            jsonb_build_object(
                'points', er.points,
                'position', er.final_position
            )
        )
    FROM event e
    JOIN team t ON e.id = t.event_id
    JOIN event_ranking er ON t.id = er.team_id
    WHERE e.tournament_id = p_tournament_id
    GROUP BY t.organization_id;
    
    -- Update positions
    WITH ranked_orgs AS (
        SELECT 
            id,
            ROW_NUMBER() OVER (ORDER BY total_points DESC) as position
        FROM tournament_ranking
        WHERE tournament_id = p_tournament_id
    )
    UPDATE tournament_ranking tr
    SET final_position = ro.position
    FROM ranked_orgs ro
    WHERE tr.id = ro.id;
END;
$$ LANGUAGE plpgsql;

-- Update competition rankings based on tournament results
CREATE OR REPLACE FUNCTION update_competition_rankings(p_competition_id BIGINT) RETURNS VOID AS $$
BEGIN
    -- Clear existing rankings
    DELETE FROM competition_ranking WHERE competition_id = p_competition_id;
    
    -- Calculate new rankings
    INSERT INTO competition_ranking (
        competition_id,
        organization_id,
        total_points,
        points_breakdown
    )
    SELECT 
        p_competition_id,
        tr.organization_id,
        SUM(tr.total_points),
        jsonb_object_agg(
            t.name,
            jsonb_build_object(
                'points', tr.total_points,
                'position', tr.final_position
            )
        )
    FROM tournament t
    JOIN tournament_ranking tr ON t.id = tr.tournament_id
    WHERE t.competition_id = p_competition_id
    GROUP BY tr.organization_id;
    
    -- Update positions
    WITH ranked_orgs AS (
        SELECT 
            id,
            ROW_NUMBER() OVER (ORDER BY total_points DESC) as position
        FROM competition_ranking
        WHERE competition_id = p_competition_id
    )
    UPDATE competition_ranking cr
    SET final_position = ro.position
    FROM ranked_orgs ro
    WHERE cr.id = ro.id;
END;
$$ LANGUAGE plpgsql;

-- Example of point system configuration
INSERT INTO point_system (name, organization_id, rules) VALUES (
    'Olympic Style Points',
    1,
    '{
        "positions": {
            "1": 100,
            "2": 80,
            "3": 60,
            "4": 50,
            "5-8": 30,
            "9-16": 15
        },
        "bonus": {
            "world_record": 20,
            "tournament_record": 10
        },
        "multipliers": {
            "team_events": 2,
            "individual_events": 1
        }
    }'
);