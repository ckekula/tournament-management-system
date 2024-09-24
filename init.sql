-- @block User Table
CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    };
-- @block Competition Table
CREATE TABLE comp (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    description VARCHAR(255),
    status VARCHAR(255) NOT NULL DEFAULT 'Not Started',
    host VARCHAR(255),
    org_id VARCHAR(255) NOT NULL,
    ADD CONSTRAINT FOREIGN KEY fk_org (org_id) REFERENCES user(id)
);
-- @block Tournament Table
CREATE TABLE tournament (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    competition_id VARCHAR(255) NOT NULL,
    sport VARCHAR(255) NOT NULL,
    begin_date DATE NOT NULL,
    end_date DATE NOT NULL,
    venue VARCHAR(255) NOT NULL,
    ADD CONSTRAINT fk_comp FOREIGN KEY (competition_id) REFERENCES competition(id)
);
-- @block Event Table
CREATE TABLE event (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    age_group VARCHAR(255),
    tournament_id VARCHAR(255) NOT NULL,
    ADD CONSTRAINT fk_tourn FOREIGN KEY (tournament_id) REFERENCES tournament(id),
    ADD CONSTRAINT check_gender CHECK (gender IN ('mens', 'womens'))
);
-- @block Group Stage Table
CREATE TABLE group_stage (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    format VARCHAR(255) DEFAULT 'Round Robin',
    event_id VARCHAR(255) NOT NULL,
    ADD CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES event(id)
);
-- @block Knockout Stage Table
CREATE TABLE knockout_stage (
    id VARCHAR(255) PRIMARY KEY,
    format VARCHAR(255) DEFAULT 'Single Elimination',
    event_id VARCHAR(255) NOT NULL,
    ADD CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES event(id)
);
-- @block Group Round Table
CREATE TABLE group_round (
    id VARCHAR(15) PRIMARY KEY,
    group_stage_id VARCHAR(10) NOT NULL,
    name VARCHAR(50),
    ADD CONSTRAINT fk_group_stage FOREIGN KEY (group_stage_id) REFERENCES group_stage(id)
);
-- @block Knockout Round Table
CREATE TABLE knockout_round (
    id VARCHAR(15) PRIMARY KEY,
    knockout_stage_id VARCHAR(10) NOT NULL,
    name VARCHAR(50),
    ADD CONSTRAINT fk_knockout_stage FOREIGN KEY (knockout_stage_id) REFERENCES knockout_stage(id)
);
-- @block Organization Table
CREATE TABLE org (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
-- @block Team Table
CREATE TABLE team (
    id VARCHAR(255) PRIMARY KEY,
    org_id VARCHAR(255) NOT NULL,
    event_id VARCHAR(255) NOT NULL,
    ADD CONSTRAINT fk_org FOREIGN KEY (organization_id) REFERENCES organization(id),
    ADD CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES event(id)
);
-- @block Participant Table
CREATE TABLE participant (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    age INT,
    gender VARCHAR(255),
    team_id VARCHAR(15) NOT NULL,
    ADD CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES team(id)
);
-- @block Competition Results Table
CREATE TABLE comp_results (
    competition_id VARCHAR(255) NOT NULL,
    comp_first_id VARCHAR(255) NOT NULL,
    comp_second_id VARCHAR(255) NOT NULL,
    comp_third_id VARCHAR(255) NOT NULL,
    ADD CONSTRAINT fk_comp_first FOREIGN KEY (comp_first_id) REFERENCES organization(id),
    ADD CONSTRAINT fk_comp_second FOREIGN KEY (comp_second_id) REFERENCES organization(id),
    ADD CONSTRAINT fk_comp_third FOREIGN KEY (comp_third_id) REFERENCES organization(id),
);
-- @block Tournament Results Table
CREATE TABLE tourn_results (
    tournament_id VARCHAR(255) NOT NULL,
    tourn_first_id VARCHAR(255) NOT NULL,
    tourn_second_id VARCHAR(255) NOT NULL,
    tourn_third_id VARCHAR(255) NOT NULL,
    ADD CONSTRAINT fk_tourn_first FOREIGN KEY (tourn_first_id) REFERENCES team(id),
    ADD CONSTRAINT fk_tourn_second FOREIGN KEY (tourn_second_id) REFERENCES team(id),
    ADD CONSTRAINT fk_tourn_third FOREIGN KEY (tourn_third_id) REFERENCES team(id),
);
-- @block Knockout Results Table
CREATE TABLE knockout_results (
    knockout_id VARCHAR(255) NOT NULL,
    tourn_first_id VARCHAR(255) NOT NULL,
    tourn_second_id VARCHAR(255) NOT NULL,
    tourn_third_id VARCHAR(255) NOT NULL,
    ADD CONSTRAINT fk_tourn_first FOREIGN KEY (tourn_first_id) REFERENCES team(id),
    ADD CONSTRAINT fk_tourn_second FOREIGN KEY (tourn_second_id) REFERENCES team(id),
    ADD CONSTRAINT fk_tourn_third FOREIGN KEY (tourn_third_id) REFERENCES team(id),
);
-- @block Part Round Score Table
CREATE TABLE part_round_score (
    prs_id VARCHAR(20) PRIMARY KEY,
    participant_id VARCHAR(10) NOT NULL,
    rounds_id VARCHAR(15) NOT NULL,
    participant_score INT,
    FOREIGN KEY (participant_id) REFERENCES participant(participant_id),
    FOREIGN KEY (rounds_id) REFERENCES rounds(rounds_id)
);
-- @block Team Round Score Table
CREATE TABLE team_round_score (
    trs_id VARCHAR(20) PRIMARY KEY,
    team_id VARCHAR(15) NOT NULL,
    rounds_id VARCHAR(15) NOT NULL,
    team_score INT,
    FOREIGN KEY (team_id) REFERENCES team(team_id),
    FOREIGN KEY (rounds_id) REFERENCES rounds(rounds_id)
);
-- @block Team Round Points Table
CREATE TABLE team_round_points (
    trp_id VARCHAR(20) PRIMARY KEY,
    team_id VARCHAR(15) NOT NULL,
    rounds_id VARCHAR(15) NOT NULL,
    team_points INT,
    FOREIGN KEY (team_id) REFERENCES team(team_id),
    FOREIGN KEY (rounds_id) REFERENCES rounds(rounds_id)
);
-- @block Team Event Points Table
CREATE TABLE team_event_points (
    tep_id VARCHAR(20) PRIMARY KEY,
    team_id VARCHAR(15) NOT NULL,
    events_id varchar(10) NOT NULL,
    event_points INT,
    FOREIGN KEY (team_id) REFERENCES team(team_id),
    FOREIGN KEY (events_id) REFERENCES events(events_id)
);
-- @block Uni Comp Points Table
CREATE TABLE uni_comp_points (
    ucp_id VARCHAR(255) PRIMARY KEY,
    uni_id VARCHAR(5) NOT NULL,
    comp_id VARCHAR(10) NOT NULL,
    uni_points INT,
    FOREIGN KEY (uni_id) REFERENCES uni(uni_id),
    FOREIGN KEY (comp_id) REFERENCES comp(comp_id)
);
-- @block round team Table
CREATE TABLE round_teams(
    round_teams_id VARCHAR(20) PRIMARY KEY,
    team_id VARCHAR(20) NOT NULL,
    rounds_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (team_id) REFERENCES team(team_id),
    FOREIGN KEY (rounds_id) REFERENCES rounds(rounds_id)
);
-- @block Official Table
CREATE TABLE official (
    official_id VARCHAR(10) PRIMARY KEY,
    official_name VARCHAR(50) NOT NULL,
    events_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (events_id) REFERENCES events(events_id),
    FOREIGN KEY (supervisor_id) REFERENCES official(official_id)
);