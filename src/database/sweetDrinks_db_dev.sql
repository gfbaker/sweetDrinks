DROP DATABASE IF EXISTS sweetDrinks_db_dev;
CREATE DATABASE sweetDrinks_db_dev;
USE sweetDrinks_db_dev;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
   `id` INT,
   `nombre` VARCHAR(100) NOT NULL,
   `precio` FLOAT NOT NULL,
   `porcentajeAlcohol` FLOAT,
   `volumen` TINYTEXT NOT NULL,
   `descripcion` TEXT,
   `stock` INT NOT NULL,
   `descuento` INT,
   `oferta` TINYINT NOT NULL,
   `importado` TINYINT NOT NULL,
   `esPack` TINYINT NOT NULL,
   `categoria_id`  INT(10),
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
   `id` INT,
   `tipo` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
   `id` INT AUTO_INCREMENT,
   `nombre` VARCHAR(100) NOT NULL,
   `apellido` VARCHAR(100) NOT NULL,
   `telefono` VARCHAR(20),
   `userAuthData_id` INT(10),
   `imagen_id` VARCHAR(100),
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
   `id` INT AUTO_INCREMENT,
   `nombre` VARCHAR(100) NOT NULL,
   `product_id` INT,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `usersauthdata`;
CREATE TABLE `usersauthdata` (
   `id` INT AUTO_INCREMENT,
   `email` VARCHAR(100) NOT NULL,
   `contrase�a` VARCHAR(100) NOT NULL,
   `admin` TINYINT NOT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
   `id` INT AUTO_INCREMENT,
   `user_id` INT NOT NULL,
   `cantidad` INT NOT NULL,
   `total` INT,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `cartDetails`;
CREATE TABLE `cartDetails` (
   `id` INT AUTO_INCREMENT,
    `cart_id` INT,
   `product_id` INT,
   PRIMARY KEY (`id`)
);

LOCK TABLES `usersauthdata` WRITE;
INSERT INTO `usersauthdata` (id,contrase�a,email,admin) VALUES (1,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','lpeasey0@hugedomains.com',0),(2,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','akellaway1@fema.gov',0),(3,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','cplaunch2@amazon.co.uk',0),(4,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','vjunkin3@newsvine.com',0),(5,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','kdabner4@vimeo.com',0),(6,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','hlippett5@deviantart.com',0),(7,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','amacauley6@foxnews.com',0),(8,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','wmacgeffen7@wufoo.com',0),(9,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','eaireton8@domainmarket.com',0),(10,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','sellis9@liveinternet.ru',0),(11,'$2a$10$C/Igtp0PYH90oHoc3cMfqu/rKy6NoK6oY.lAhkVAwcFJ9WfB78gEK','juanperez@juanperez.com',1);
UNLOCK TABLES;

LOCK TABLES `categories` WRITE;
INSERT INTO `categories` (id,tipo) VALUES (1,'Aperitivos'),(2,'Whiskies'),(3,'Cervezas'),(4,'Vinos'),(5,'Champagne y espumantes'),(6,'Bebidas blancas y destiladas'),(7,'Licores');
UNLOCK TABLES;

LOCK TABLES `products` WRITE;
INSERT INTO `products` (id,nombre,precio,porcentajeAlcohol,volumen,descripcion,stock,descuento,oferta,importado,esPack,categoria_id) VALUES (1,'CYNAR',615,16.5,'750cc','Aperitivo amargo y liviano. Se ha bebido tradicionalmente solo, con soda, gaseosas o zumos. Ha sido redescubierto para utilizar en cocteler�a por su car�cter ex�tico y el misterio de sus ingredientes en c�cteles originales. Se puede preparar con refrescos de naranja o pomelo y se ha popularizado preparado como un Julep, con menta, az�car y zumo de pomelo. Cl�sico y popular en Argentina.',200,15,true,false,false,1),(2,'CAMPARI ',590,28.5,'750cc','Campari es una bebida alcoh�lica espirituosa obtenida de la infusi�n de hierbas amargas, plantas arom�ticas y frutas en alcohol y agua. Muchos han intentado adivinar el n�mero de ingredientes: dicen que 20 o 60, otros dicen que son 80 ingredientes. Hasta d�a de hoy, el alcohol y el agua son los �nicos ingredientes conocidos de su receta secreta tan especial. Su color rojo vibrante, intenso aroma y su sabor amargo distintivo lo hacen extremadamente vers�til, y la perfecta base para algunos de los c�cteles m�s famosos del mundo.',400,20,true,false,false,1),(3,'GANCIA',390,14,'950cc','Americano Gancia es un aperitivo que se caracteriza por la presencia de sabores herb�ceos y c�tricos que se combinan con los del vino blanco y el alcohol. El sabor amargo de las hierbas se mezcla con el dulzor del az�car logrando una bebida amable, agradable al beber, equilibrada y de gran personalidad.',35,10,true,false,false,1),(4,'JACK DANIELS',5100,40,'750cc','Se suaviza el whisky gota a gota pas�ndolo por carb�n vegetal y luego se deja madurar en barriles que fabrican ellos mismos artesanalmente. Adem�s, no se sigue ningun calendario estricto. El Tennessee Sippin Whisky (whisky de Tennessee para degustaci�n) est� listo s�lo cuando los catadores dicen que est� listo.',3,0,false,true,false,2),(5,'PACK HEINEKEN x6',1100,4,'473 ml','Nacida en �msterdam y criada por el mundo, Heineken es una cerveza premium de gran tradici�n y calidad. Cebada malteada, agua, l�pulo y la exclusiva levadura A-Yeast� son los ingredientes 100% naturales que le entregan su distintivo sabor y su inigualable calidad.',200,0,false,false,true,3),(6,'CORONA PORRON',150,4,'330cc','Cerveza clara y brillante, de espuma blanca y consistente. Destacan sus ligeras notas afrutadas, resultado de la fermentaci�n. De cuerpo medio, fresca, balanceada y muy f�cil de beber. En boca es moderadamente dulce y recuerda al sabor del cereal.',500,0,false,false,false,3),(7,'QUILMES STOUT BOTELLA',160,4,'1L','Cerveza negra, de cuerpo y espuma cremosa, su intenso amargor se compensa con notas de chocolate y caf� provenientes del golpe de fuego que recibe la malta al momento de ser tostada. Es una opci�n ideal para maridar con postres dulces, platos fuertes, ahumados, tostados o picantes.',500,10,true,false,false,3),(8,'QUILMES RED LAGGER PACK X6',580,4,'473cc','Red Lager es una cerveza de sabor acaramelado y de color rojo brillante. Est� elaborada con maltas tostadas e ingredientes 100% argentinos y es ideal para combinar con todo tipo de carnes, milanesas y picada de quesos',300,0,false,false,true,3),(9,'ALAMOS RED BLEND',990,14,'750ml','Es un vino ex�tico: frutado en rojo, bien intenso, y con un trazo expectorante que, una vez en el paladar, aporta delgadez y tensi�n. Elaborado en Lujan de Cuyo y Valle de Uco. Provincia de Mendoza, Argentina',30,0,false,false,false,4),(10,'CAFAYATE MALBEC ',365,14,'750ml','COLOR: rojo viol�ceo intenso con reflejos p�rpuras. AROMA: arom�tico con notas de ciruela, uvas pasas y pimienta roja. BOCA: balanceado, con cuerpo completo y taninos dulces, con un final suave y afrutado. MARIDAJE SUGERIDO: carnes vacunas grilladas, cerdo asado, quesos duros, rag�ut.',15,0,false,false,false,1),(11,'CAFAYATE ROSE',365,13,'750ml','Los rosados salte�os tienen una virtud sobre sus pares de otras regiones: son intensos y arom�ticos. En ese sentido, este vino de Bodega Etchart cumple el canon a la perfecci�n. Rojo liviano a la vista, su arom�tica intensa recuerda a cerezas y guindas. Al paladar ingresa goloso, de acidez moderada a baja y con una textura carnosa que le gustar� al bebedor de tintos. Muy fr�o ir� bien.',10,0,false,false,false,4),(12,'FERNET BRANCA',390,39,'450','Bebida alcoh�lica amarga elaborada a partir de varios tipos de hierbas (mirra, ruibarbo, manzanilla, cardamomo y azafr�n, entre otras), que son maceradas en alcohol de uva, filtradas y a�ejadas en toneles de roble durante un per�odo que puede ser de 6 a 12 meses.',400,15,true,false,false,1),(13,'SIDRA LA VICTORIA',220,4,'720ml','Sidra La Victoria est� elaborada a partir de una cuidadosa selecci�n de su materia prima, la manzana. Basada en una receta tradicional, conserva su esencia de generaci�n en generaci�n, brindando un sabor natural, frutal y burbujeante, agradable para todos e ideal para cualquier ocasi�n.',70,30,true,false,false,5),(14,'SIDRA 1888 ROSE',790,5,'750ml','Est� elaborada con manzanas seleccionadas del Alto Valle de R�o Negro, y toma lo mejor de la flor del hibisco (tambi�n llamada como rosa china), lo que le aporta su tinte ros�ceo y sensaci�n de frescura. Se trata de una bebida sin TACC (trigo, avena, cebada y centeno), por lo cual es apta para cel�acos, muy ligera y amigable al paladar, logrando su equilibrio con el aroma de las rosas.',50,0,false,false,false,5),(15,'CHANDON ESPUMANTE EXTRA BRUT',885,12,'750ml','Chandon Extra Brut es el gran cl�sico de Chandon. Las mejores uvas de Chardonnay y Pinot Noir nos permiten crear un espumoso fresco, frutado, elegante, cremoso y equilibrado. Se destaca por su fineza y precisi�n.',20,0,false,false,false,5),(16,'VODKA SMIRNOFF',710,38,'700cc','Smirnoff es un vodka de origen ruso, de 37,5% alc./vol., obtenido por triple destilaci�n del alcohol de grano, y filtrado por carb�n, cuya fabricaci�n se inici� en el a�o 1864 por Pyotr Alexandrovich Smirnov.',65,0,false,false,false,6),(17,'ABSOLUT VODKA',2000,40,'750ml','ABSOLUT VODKA est� elaborado exclusivamente con ingredientes naturales, y a diferencia de otros vodkas, no contiene az�cares a�adidos. Absolut es, de hecho, tan puro como puede ser el vodka. A�n as�, la pureza tiene un sabor: rico, con cuerpo y complejo, pero suave y maduro con el car�cter distintivo del grano de trigo, seguido de un toque a frutas secas.',30,0,false,false,false,6),(18,'WHISKY GLENFIDDICH 12 A�OS',8900,40,'750ml','Glenfiddich 12 es un whisky suave y ligero, f�cil de beber. Posee notas intensas de caramelo y vainilla al principio, que luego van matiz�ndose en distintas notas frutales, como las mencionadas pera y manzana. Tambi�n podremos detectar, ya mucho m�s sutiles, notas de madera y malta.',5,0,false,true,false,2),(19,'WHISKY CHIVAS REGAL',4900,40,'750ml','Una mezcla rica y generosa, madurada en barricas de jerez espa�ol escogidas a mano por el Maestro Mezclador y su equipo. Estas barricas son especiales y dif�ciles de encontrar, y forman una peque�a parte de nuestras existencias. Notas de cata: peras dulces y maduras en alm�bar, vainilla con caramelo, dulces de canela y un trasfondo de almendras.',15,0,false,true,false,2),(20,'CUSENIER LICOR DE CAFE',373,24,'700ml','Calidad y buen sabor que se deben a la correcta aplicaci�n de las t�cnicas de elaboraci�n, que involucran la combinaci�n de la tecnolog�a industrial con la receta artesanal. Los ingredientes utilizados en estos licores son todos de primera calidad, alcoholes nacionales seleccionados, az�car refinado, leche, frutas seleccionadas y cacao.',50,15,true,false,false,7),(21,'TIA MARIA CREAMY',1100,17,'690ml','Tia Maria Cream combina el sabor de Tia Maria m�s la sensualidad de la crema fresca y un toque de finas esencias. Tia Maria Cream es un licor con atributos de sensualidad, misterio y sofisticaci�n. Modo de consumo: solo, con hielo o en tragos.',50,0,false,false,false,7),(22,'LICOR BAILEYS',2500,17,'750ml','Con un aroma a chocolate y una sensaci�n suave y sedosa en la boca, Baileys tiene sabores ricos de crema de leche, cacao y vainilla. Son estos sabores indulgentes, aromas y texturas aterciopeladas lo que hace de Baileys el licor perfecto para ponerte creativo. Desde el estilo de caf� que puedes servir con Baileys hasta los cremosos c�cteles que puedes ofrecer, �este licor es perfecto para creaciones post cena. Tambi�n es el licor ideal para compartir con la cocina de tu establecimiento, ya que se puede utilizar para hacer deliciosos postres y dulces.',60,0,false,true,false,7),(23,'LICOR GRAND MARNIER',5200,40,'700cc','Se caracteriza por su brillante color topacio con algunos matices dorados y �mbar. Tiene cierto aroma a naranjas, caramelo y flores. Su sabor es algo amargo con toques de casta�a, un definido sabor a co�ac y algo de naranjas. El Grand Marnier puede usarse para elaborar c�cteles como el Sidecar, Dirty Harry, Grand Mimosa, B-52, Grand Marnier Smash y Grand Smash, entre otros.',5,0,false,true,false,7);
UNLOCK TABLES;

LOCK TABLES `users` WRITE;
INSERT INTO `users` (id,nombre,apellido,telefono,userAuthData_id) VALUES (1,'Lutero','Peasey','8411442047',1),(2,'Adams','Kellaway','8436600593',2),(3,'Catherine','Plaunch','3433536181',3),(4,'Vany','Junkin','9733600028',4),(5,'Kassie','Dabner','9831459885',5),(6,'Hinda','Lippett','5347773708',6),(7,'Alma','Macauley','1275161222',7),(8,'Walton','MacGeffen','9662675778',8),(9,'Ezri','Aireton','8656992650',9),(10,'Stephan','Ellis','2378601608',10),(11,'Juan','Perez','12345467879',11);
UNLOCK TABLES;

LOCK TABLES `carts` WRITE;
INSERT INTO `carts` (id,user_id,cantidad) VALUES (1,1,4),(2,1,4),(3,2,4),(4,2,4),(5,2,4),(6,3,4),(7,4,4),(8,5,4),(9,5,4),(10,5,4),(11,5,4),(12,5,4);
UNLOCK TABLES;

LOCK TABLES `cartDetails` WRITE;
INSERT INTO `cartDetails` (id,cart_id,product_id) VALUES (1,1,4),(2,1,4),(3,2,4),(4,2,4),(5,2,4),(6,3,4),(7,4,4),(8,5,4),(9,5,4),(10,5,4),(11,5,4),(12,5,4);
UNLOCK TABLES;

LOCK TABLES `images` WRITE;
INSERT INTO `images` (id,nombre,product_id) VALUES (1,'Cynar.jpg',1),(2,'Campari.jpg',2),(3,'Gancia.jpg',3),(4,'JackDaniels 750.jpg',4),(5,'heinekenPack.jpg',5),(6,'imagenes-1636936491296-.jpg',6),(7,'imagenes-1636936559461-.jpg',7),(8,'imagenes-1636936632436-.jpg',8),(9,'imagenes-1636936848903-.jpg',9),(10,'imagenes-1636937089242-.jpg',10),(11,'imagenes-1636937203256-.jpg',11),(12,'imagenes-1636937347888-.jpg',12),(13,'imagenes-1636937659489-.jpg',13),(14,'imagenes-1636937869028-.jpg',14),(15,'imagenes-1636937990732-.jpg',15),(16,'imagenes-1636938326949-.jpg',16),(17,'imagenes-1636938434139-.jpg',17),(18,'imagenes-1636938591987-.jpg',18),(19,'imagenes-1636938682426-.jpg',19),(20,'imagenes-1636938842228-.jpg',20),(21,'imagenes-1636938933707-.jpg',21),(22,'imagenes-1636939084902-.jpg',22),(23,'imagenes-1636939243819-.jpg',23);
UNLOCK TABLES;

ALTER TABLE `products` ADD CONSTRAINT `FK_26dd350a-d2ad-40a5-9b0c-c3ca6323ab12` FOREIGN KEY (`categoria_id`) REFERENCES `categories`(`id`)  ;

ALTER TABLE `images` ADD CONSTRAINT `FK_c76cd1ec-c0b1-4c08-bad4-075212d43d3b` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_326e543f-2fff-449c-82d8-3d7acabbe72e` FOREIGN KEY (`userAuthData_id`) REFERENCES `usersauthdata`(`id`)  ;

ALTER TABLE `carts` ADD CONSTRAINT `FK_36a088c8-7170-4b87-af52-902e5137e9a7` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)  ;

ALTER TABLE `cartDetails` ADD CONSTRAINT `FK_37cc7bdb-7a18-4285-9b29-9437e89757fb` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`)  ;

ALTER TABLE `cartDetails` ADD CONSTRAINT `FK_74329200-a309-400a-8fd3-f8f92e97bc8a` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)  ;