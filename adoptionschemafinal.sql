create database kulaabhooshanam;
use kulaabhooshanam;

create table adoptionagency (
	agency_id int unsigned primary key not null auto_increment, 
    agency_name varchar(45) not null, 
    location varchar(45) not null, 
    address varchar(45) not null, 
    phno varchar(13) not null unique, 
    check (phno regexp "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"), 
    email_id varchar(45) not null, 
    check (email_id  regexp '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'), 
    numkids int not null, 
    num_succ_ad int not null
);

ALTER TABLE adoptionagency AUTO_INCREMENT=100;


SELECT * FROM adoptionagency;
    
create table children(
	child_id int primary key not null auto_increment, 
    c_name varchar(45), 
    dob date, 
    sex enum ('male' ,'female', 'other'), 
    date_admitted datetime, 
    adoption_status enum ('inhouse', 'adopted'),  # adoptable removed
    genetic_disorder varchar(100), 
    agency_id int unsigned,
    age int,
    FOREIGN KEY (agency_id) REFERENCES adoptionagency(agency_id)
);

UPDATE children
SET age = TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE);

# Update age by above command


SELECT * FROM children;


create table parents (
	p_id varchar(15) unique not null primary key, 
    check (p_id regexp "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$"), 
    p_name varchar(45) not null, 
    email_id varchar (45) not null, 
    check (email_id regexp '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'), 
    pswd varchar(8) not null, 
    n_bio_kids int not null, 
    n_adopted_kids int not null, 
    appln_status enum ('pending', 'rejected', 'successful') default ('null'), 
    c_id INT UNSIGNED DEFAULT NULL REFERENCES children(child_id),
    phno varchar(13) not null unique, 
    check (phno regexp "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"), 
    sex enum ('male', 'female', 'other') not null, 
    annual_income int not null, 
    bank_details varchar(45)  not null, 
    marital_status enum ('married', 'divorced', 'single', 'widowed') not null, 
    age int not null, 
    spouse_age int default (0), 
    spouse_name varchar(45) default NULL, 
    spouse_aadhar varchar(15) default NULL, 
    check (spouse_aadhar regexp "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$"), 
    address varchar(45) not null, 
    financial_status enum ('BPL', 'middleclass', 'rich') not null, 
    caste varchar(45) default NULL
);


SELECT * FROM parents;
    
create table application (
	app_id int primary key not null auto_increment, 
    appln_status enum ('pending', 'successful', 'rejected') default 'pending', 
    p_id varchar (15) not null unique references parents(p_id), 
    sex enum ('male', 'female', 'other') not null, 
    child_age int, 
    g_disorder enum('yes', 'no') not null, 
    c_id int unsigned references children(child_id)
);

ALTER TABLE application AUTO_INCREMENT=1000;

SELECT * FROM application;
    

alter table parents add constraint chk_age 
	check ((spouse_aadhar is null and age <= 55) or (spouse_aadhar is not null and age + spouse_age <= 110));
    
SELECT * FROM children; # id from 1
SELECT * FROM parents; # id is aadhar
SELECT * FROM adoptionagency; # id is from 100
SELECT * FROM application; # id is from 1000
