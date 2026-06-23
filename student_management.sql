CREATE DATABASE IF NOT EXISTS student_management;

USE student_management;

CREATE TABLE IF NOT EXISTS students (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
email VARCHAR(255),
course VARCHAR(255)
);

INSERT INTO students (name, email, course)
VALUES
('POM Student', '[pom@test.com](mailto:pom@test.com)', 'Playwright'),
('Playwright Test', '[playwright@test.com](mailto:playwright@test.com)', 'Automation');
