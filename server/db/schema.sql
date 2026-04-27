
CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'user');

CREATE TYPE exercise_type AS ENUM (
    'running',
    'cycling',
    'swimming',
    'weightlifting',
    'yoga',
    'other',
    'none'
);

CREATE TABLE users (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username    TEXT        NOT NULL UNIQUE,
    first_name  TEXT        NOT NULL,
    last_name   TEXT        NOT NULL,
    email       TEXT        NOT NULL UNIQUE,
    password    TEXT        NOT NULL,
    phone       TEXT,
    role        user_role   NOT NULL DEFAULT 'user',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE exercises (
    id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id       INTEGER        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title         TEXT           NOT NULL,
    exercise_type exercise_type  NOT NULL DEFAULT 'none',
    date          DATE           NOT NULL DEFAULT CURRENT_DATE,
    duration      INTEGER        NOT NULL DEFAULT 0 CHECK (duration >= 0),
    calories      INTEGER        NOT NULL DEFAULT 0 CHECK (calories >= 0),
    description   TEXT,
    pace          NUMERIC(10, 2),
    distance      NUMERIC(10, 2),
    picture       TEXT,
    location      TEXT,
    created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX exercises_user_id_idx ON exercises (user_id);
CREATE INDEX exercises_date_idx    ON exercises (date);
