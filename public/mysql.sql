DROP TABLE users;

CREATE TABLE users(
    userID INT Not NULL AUTO_INCREMENT,

    username VARCHAR(20) NOT NULL,
    passwd VARCHAR(50) NOT NULL DEFAULT 'password',
    
    email VARCHAR(50) NOT NULL DEFAULT 'NOT VERIFIED',

    age INT NOT NULL,
    birthDate DATE NOT NULL,

    PRIMARY KEY(userId)
);

ALTER TABLE users AUTO_INCREMENT=100;

DELETE FROM users;

SELECT * FROM users;