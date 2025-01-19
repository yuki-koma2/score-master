CREATE TABLE users
(
    id         UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    email      TEXT UNIQUE NOT NULL,
    name       TEXT        NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subjects
(
    id         UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    name       TEXT NOT NULL,
    theme      TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scores
(
    id         UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    user_id    UUID REFERENCES users (id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects (id) ON DELETE CASCADE,
    score      INTEGER CHECK (score >= 0 AND score <= 100),
    reason     TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, subject_id)
);

-- INDEX
CREATE INDEX idx_scores_subject_id ON scores (subject_id);
CREATE INDEX idx_scores_user_id ON scores (user_id);
CREATE INDEX idx_scores_score ON scores (score);


-- ========================
-- users テーブルの RLS 設定
-- ========================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE
POLICY select_all_users ON users
FOR
SELECT
    USING (true); -- 全行の読み取りを許可

CREATE
POLICY update_own_user ON users
FOR
UPDATE
    USING (auth.uid() = id);
-- 自分のデータのみ更新可能


-- ========================
-- subjects テーブルの RLS 設定
-- ========================
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

CREATE
POLICY select_all_subjects ON subjects
FOR
SELECT
    USING (true); -- 全行の読み取りを許可

CREATE
POLICY insert_subjects_admin ON subjects
FOR INSERT
WITH CHECK (auth.role() = 'admin'); -- adminロールのみ挿入許可


-- ========================
-- scores テーブルの RLS 設定
-- ========================
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

CREATE
POLICY select_own_scores ON scores
FOR
SELECT
    USING (auth.uid() = user_id); -- 自分が付けたスコアのみ読み取り可能

CREATE
POLICY insert_own_scores ON scores
FOR INSERT
WITH CHECK (auth.uid() = user_id); -- 自分のスコアのみ挿入可能

CREATE
POLICY update_own_scores ON scores
FOR
UPDATE
    USING (auth.uid() = user_id); -- 自分のスコアのみ更新可能