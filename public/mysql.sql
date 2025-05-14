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

ALTER TABLE users AUTO_INCREMENT=114;

ALTER TABLE users ADD roles VARCHAR(20) DEFAULT 'customer' NOT NULL;

DELETE FROM users;

DESCRIBE users;

SELECT * FROM users;

DELETE FROM users WHERE userID=114;

DROP TABLE products;

CREATE TABLE products(
    productId INT NOT NULL AUTO_INCREMENT,
    productName VARCHAR(50) NOT NULL,
    descriptions VARCHAR(150) NOT NULL,
    imagePath VARCHAR(50) NOT NULL DEFAULT 'not found or assigned',
    price INT NOT NULL,

    PRIMARY KEY(productId),
    CONSTRAINT not_negative CHECK(price > 0)
);

ALTER TABLE products AUTO_INCREMENT = 1;
DESCRIBE products;

SELECT * from products;
-- insert statement
INSERT INTO products (productName, descriptions, price) VALUES
('Dark Sentinel EDR', 'Advanced endpoint protection with AI-powered threat detection and automated remediation.', 999),
('ShadowMind TI', 'Gain a strategic advantage with real-time threat intelligence and predictive analysis.', 1299),
('Night Auditor', 'Ensure compliance and identify security misconfigurations across your systems.', 799),
('Obsidian SIEM', 'Real-time security monitoring and analysis for proactive threat detection and incident response.', 1999),
('PhantomAuth Token', 'Hardware-based multi-factor authentication for secure access to your critical accounts.', 49),
('Data Cloak DLP', 'Protect your confidential information with advanced data monitoring and control.', 1499),
('Mail Shadow Guardian', 'Advanced email security to block threats and secure your communications.', 599),
('Web Veil WAF', 'Safeguard your web applications from online attacks and data breaches.', 899),
('DarkTrace Forensics', 'Comprehensive tools for incident response and digital evidence analysis.', 1199),
('Net Watcher', 'Real-time network traffic analysis for intrusion detection and performance monitoring.', 699);

UPDATE products SET imagePath = 'imgs/items/Dark-Sentinel-EDR.png' WHERE productName = 'Dark Sentinel EDR';
UPDATE products SET imagePath = 'imgs/items/ShadowMind-TI.jpg' WHERE productName = 'ShadowMind TI';
UPDATE products SET imagePath = 'imgs/items/Night-Auditor.webp' WHERE productName = 'Night Auditor';
UPDATE products SET imagePath = 'imgs/items/Obsidian-SIEM.jpg' WHERE productName = 'Obsidian SIEM';
UPDATE products SET imagePath = 'imgs/items/PhantomAuth-Token.jpg' WHERE productName = 'PhantomAuth Token';
UPDATE products SET imagePath = 'imgs/items/Data-Cloak-DLP.png' WHERE productName = 'Data Cloak DLP';
UPDATE products SET imagePath = 'imgs/items/Mail-Shadow-Guardian.webp' WHERE productName = 'Mail Shadow Guardian';
UPDATE products SET imagePath = 'imgs/items/Web-Veil-WAF.webp' WHERE productName = 'Web Veil WAF';
UPDATE products SET imagePath = 'imgs/items/DarkTrace-Forensics.webp' WHERE productName = 'DarkTrace Forensics';
UPDATE products SET imagePath = 'imgs/items/Net-Watcher.webp' WHERE productName = 'Net Watcher';


