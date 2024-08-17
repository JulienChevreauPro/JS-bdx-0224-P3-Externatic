CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(80) NOT NULL,
  lastname VARCHAR(80) NOT NULL,
  email VARCHAR(80) UNIQUE NOT NULL,
  phone VARCHAR(80),
  hashed_password VARCHAR(250) NOT NULL,
  role VARCHAR(80) NOT NULL DEFAULT 'candidat'
);
INSERT INTO user (firstname, lastname, email, phone, hashed_password, role)
VALUES ('Alexandre', 'Moro', 'adrale@gmail.com', '123456789', '$argon2id$v=19$m=19456,t=2,p=1$tO+RzSVxG6uFPtmv7LXeKQ$hC2icKgRJLSNnY/913TVQ1xQRwJL4EnPrzGB04RGKSk', 'consultant');

CREATE TABLE consultant (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_consultant_user
    FOREIGN KEY (user_id)
    REFERENCES user(id)
);

INSERT INTO consultant (user_id)
VALUES (1);

CREATE TABLE admin (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_admin_user
    FOREIGN KEY (user_id)
    REFERENCES user(id)
);

CREATE TABLE candidate (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  picture VARCHAR(255),
  user_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_candidate_user
    FOREIGN KEY (user_id)
    REFERENCES user(id)
);

CREATE TABLE cv (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  path VARCHAR(255),
  name VARCHAR(80),
  candidate_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_cv_candidate
    FOREIGN KEY (candidate_id)
    REFERENCES candidate(id)
);

CREATE TABLE region (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(80) NOT NULL,
  candidate_id INT UNSIGNED NOT NULL,
  consultant_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_region_candidate
    FOREIGN KEY (candidate_id)
    REFERENCES candidate(id),
    CONSTRAINT fk_region_consultant
    FOREIGN KEY (consultant_id)
    REFERENCES consultant(id)
);

CREATE TABLE techno (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(80) NOT NULL
);

CREATE TABLE techno_candidate (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  techno_id INT UNSIGNED NOT NULL,
  candidate_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_techno_candidate_techno
    FOREIGN KEY (techno_id)
    REFERENCES techno(id),
    CONSTRAINT fk_techno_candidate_candidate
    FOREIGN KEY (candidate_id)
    REFERENCES candidate(id)
);

CREATE TABLE company (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  banner VARCHAR(255),
  logo VARCHAR(255),
  description TEXT
);

CREATE TABLE offer (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(80) NOT NULL,
  type VARCHAR(80) NOT NULL,
  details TEXT NOT NULL,
  city VARCHAR(255) NOT NULL,
  advantages TEXT,
  salary INT UNSIGNED,
  consultant_id INT UNSIGNED NOT NULL,
  company_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_offer_consultant
    FOREIGN KEY (consultant_id)
    REFERENCES consultant(id),
    CONSTRAINT fk_offer_company
    FOREIGN KEY (company_id)
    REFERENCES company(id)
);

CREATE TABLE favorite (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  candidate_id INT UNSIGNED NOT NULL,
  offer_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_favorite_candidate
    FOREIGN KEY (candidate_id)
    REFERENCES candidate(id),
    CONSTRAINT fk_favorite_offer
    FOREIGN KEY (offer_id)
    REFERENCES offer(id)
);

CREATE TABLE techno_offer (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  techno_id INT UNSIGNED NOT NULL,
  offer_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_techno_offer_techno
    FOREIGN KEY (techno_id)
    REFERENCES techno(id),
    CONSTRAINT fk_techno_offer_offer
    FOREIGN KEY (offer_id)
    REFERENCES offer(id)
);

CREATE TABLE candidacy (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(50) NOT NULL,
  candidate_id INT UNSIGNED NOT NULL,
  offer_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_candidacy_candidate
    FOREIGN KEY (candidate_id)
    REFERENCES candidate(id),
    CONSTRAINT fk_candidacy_offer
    FOREIGN KEY (offer_id)
    REFERENCES offer(id)
);
