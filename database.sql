DROP DATABASE IF EXISTS Blood_Donation_System;
CREATE DATABASE Blood_Donation_System;
USE Blood_Donation_System;


DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient (
	patient_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255),
    patient_age INT,
    patient_blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+') NOT NULL,
    patient_contact VARCHAR(255),
	blood_seeker enum('yes', 'no') not null,
    patient_medical_report VARCHAR(255)
);

CREATE TABLE Donor(
	donor_id INT AUTO_INCREMENT PRIMARY KEY,
	donor_name VARCHAR(255),
	donor_age INT,
	donor_blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-' ) NOT NULL,
	donor_contact VARCHAR(255),
	donor_medical_report TEXT,
	donor_address VARCHAR(255),
	bank_id INT
);

CREATE TABLE BloodBank(
	bank_id INT PRIMARY KEY,
	bank_name VARCHAR(255),
	bank_contact VARCHAR(255),
	donor_names TEXT,
	bank_address VARCHAR(255)
);

CREATE TABLE BloodDonation (
    donation_id INT auto_increment PRIMARY KEY,
    patient_id INT ,
    donor_id INT NULL,
    bank_id INT NUll,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (bank_id) REFERENCES BloodBank(bank_id),
    FOREIGN KEY (donor_id) REFERENCES Donor(donor_id)
);



