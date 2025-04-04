use master;
go -- dajemo mu vremena da se prebaci prije nego �to ide dalje
-- bri�em postoje�u bazu ako postoji
drop database if exists kinowp6;
go
-- kreiram novu bazu
create database kinowp6 collate Croatian_CI_AS;
go
-- pozicioniram se na bazu
use kinowp6;
go

create table dvorane(
sifra int not null primary key identity(1,1),
naziv varchar(50) not null
);

create table filmovi(
sifra int not null primary key identity(1,1),
naziv varchar(50) not null,
zanr varchar(50)
);

create table projekcije(
sifra int not null primary key identity(1,1),
film int not null references filmovi(sifra),
termin datetime not null,
dvorana int not null references dvorane(sifra),
);

create table gledatelji(
sifra int not null primary key identity(1,1),
ime varchar(50) not null,
prezime varchar(50) not null
);

create table karte(
sifra int not null primary key identity(1,1),
cijena decimal(18,2) not null,
gledatelj int not null references gledatelji(sifra),
projekcija int not null references projekcije(sifra)
);

insert into dvorane (naziv)
values ('A'),
('B'),
('C'),
('D');

insert into filmovi (naziv, zanr)
values ('Proslava','Drama'),
('Dra�en','Drama'),
('Divlj Robot','Animirani'),
('Ora�ar','Opera'),
('Transformers Po�etak','Animirani'),
('Crveni','Avantura'),
('Heretik','Horor'),
('Fatalna �etvorka','Komedija'),
('Canary black','Akcijski'),
('Gladiator 2','Akcijski');

insert into projekcije (film, termin, dvorana)
values (1,'2024-11-26 18:25',1),
(1,'2024-11-27 18:25',1),
(2,'2024-11-28 16:25',2),
(2,'2024-11-28 20:15',1),
(2,'2024-11-29 20:15',2),
(3,'2024-11-30 11:00',3),
(3,'2024-11-30 15:10',3),
(3,'2024-12-01 11:00',4),
(3,'2024-12-01 15:10',4),
(4,'2024-12-17 20:00',3),
(5,'2024-12-01 18:30',2),
(6,'2024-11-30 20:00',4),
(6,'2024-12-01 20:00',4),
(7,'2024-11-30 22:20',1),
(7,'2024-12-01 21:45',1),
(8,'2024-11-29 20:00',1),
(8,'2024-11-29 20:15',3),
(9,'2024-11-29 20:00',4),
(9,'2024-11-30 20:30',2),
(10,'2024-12-02 19:15',1),
(10,'2024-12-03 18:45',3);

insert into gledatelji (ime, prezime)
values ('Ivan','Ivi�'),
('Jelena','Tomas'),
('Luka','Kozar'),
('Tamara','Novak'),
('Matej','Mari�'),
('Jasna','Ra�i�'),
('Renato','Mesari�'),
('Mirela','Tesari�'),
('Dominik','�ari�'),
('Ana','Horvat');

insert into karte (cijena, gledatelj, projekcija)
values (15,1,1),
(15,1,2),
(15,2,2),
(15,3,3),
(20,4,4),
(7,5,5),
(15,6,6),
(15,7,7),
(15,8,8),
(15,9,9),
(15,10,10);
