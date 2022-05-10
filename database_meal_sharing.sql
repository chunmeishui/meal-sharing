use heroku_c4e9296a1628604;
SET auto_increment_increment = 1;
SET NAMES utf8mb4;
CREATE TABLE `meal` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `location` VARCHAR(255) NULL,
  `when` DATETIME NOT NULL,
  `max_reservations` INT(10) NOT NULL,
  `price` DECIMAL(7, 2) NOT NULL,
  `created_date` DATE NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE `reservation` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `number_of_guests` INT(10) NOT NULL,
    `created_date` DATE NOT NULL,
    `contact_phonenumber` VARCHAR(255) NOT NULL,
    `contact_name` VARCHAR(255) NOT NULL,
    `contact_email` VARCHAR(255) NOT NULL,
    `meal_id` int(10) UNSIGNED NOT NULL,
    CONSTRAINT `fk_meal` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  CREATE TABLE `review` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `stars` INT (10) NOT NULL,
    `created_date` DATE NOT NULL,
    `meal_id` INT(10) UNSIGNED NOT NULL,
    FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  
  INSERT INTO
  meal (
    `title`,
    `description`,
    `location`,
    `when`,
    `max_reservations`,
    `price`,
    `created_date`
  )
VALUES(
    'Fish-flavored eggplant',
    'Fish-flavored eggplant with traditional way of cooking',
    'lyngby',
    '2022-02-14 08:00:00',
    50,
    108,
    '2021-01-01'
  ),
  (
    'Green pepper shredded pork',
    'Green pepper shredded pork with spicy flavor',
    'lyngby',
    '2022-02-14 08:00:00',
    20,
    108.88,
    '2021-01-01'
  ),
  ( 'pizza',
    'pizza with garlic and chicken',
    'lyngby',
    '2022-02-15 06:54:16',
    10,
    80.5,
    '2022-02-12'
  ),
  (
    'noodles',
    'noodles with garlic and chicken',
    'Chengdu',
    '2022-02-15 06:54:16',
    10,
    80.5,
    '2022-02-13'
  ),
  ( 'hotpot',
    'hotpot with garlic and chicken',
    'lyngby',
    '2022-02-16 06:54:16',
    10,
    80.5,
    '2022-02-12'
  ),
  (
    'fried beef',
    'fried beef with garlic and chicken',
    'lyngby',
    '2022-02-16 06:54:16',
    10,
    80.5,
    '2022-02-13'
  );
  
  
  INSERT INTO
  reservation(
    number_of_guests,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email,
    meal_id
  )
VALUES
  (
    10,
    "2022-02-14",
    "2560659",
    "suman",
    "suman@163.com",
    3
  ),
  (
    5,
    "2022-02-14",
    "15600659",
    "daniel",
    "daniel@163.com",
    28
  ),
  (
    9,
    "2022-02-13",
    "456825",
    "amy",
    "amy@yahoo.com",
    38
  ),(
    5,
    "2022-02-14",
    "15260659",
    "james",
    "james@gmail.com",
    38
  ),(
    12,
    "2022-02-13",
    "54850659",
    "ania",
    "ania@googo.com",
    3
  ),(
    7,
    "2022-02-15",
    "483100659",
    "mia",
    "mia@16hyf.com",
    4
  ),  (
    20,
    "2022-02-14",
    "2560659",
    "amily",
    "amily@163.com",
    28
  ),
  (
  10,
    "2022-02-17",
    "15600659",
    "mariem",
    "mariem@163.com",
    28
  ),
  (
    9,
    "2022-02-13",
    "456825",
    "rainy",
    "rainy@yahoo.com",
    38
  ),(
    5,
    "2022-02-14",
    "15260659",
    "bob",
    "bob@gmail.com",
    3
  ),(
    12,
    "2022-02-13",
    "54850659",
    "siyuan",
    "siyuan@googo.com",
    38
  ),(
    7,
    "2022-02-15",
    "483100659",
    "youyou",
    "youyou@16hyf.com",
    3
  );
  
  INSERT INTO
  review(title, description, stars, created_date, meal_id)
VALUES
  (
    "feedback on pizza",
    "very delicious pizza with cheap price",
    5,
    "2021-02-14",
    1
  ),(
    "feedback on pizza",
    "delicious pizza with good price",
    4,
    "2021-02-15",
    1
  ),(
    "feedback on pizza",
    "delicious pizza with expensive price",
    3,
    "2021-03-15",
    1
  ),(
    "feedback on noodles",
    "very delicious noodles with cheap price",
    5,
    "2021-02-14",
    2
  ),(
    "feedback on noodles",
    "delicious noodles with good price",
    4,
    "2021-02-15",
    2
  ),(
    "feedback on noodles",
    "delicious noodles with expensive price",
    4,
    "2021-03-15",
    2
  ),(
    "feedback on hotpot",
    "very delicious hotpot with cheap price",
    4,
    "2021-02-14",
    3
  ),(
    "feedback on hotpot",
    "delicious hotpot with good price",
    4,
    "2021-02-15",
    3
  ),(
    "feedback on hotpot",
    "delicious hotpot with expensive price",
    3,
    "2021-03-15",
    3
  ),(
    "feedback on fried beef",
    "very delicious fried beef with cheap price",
    5,
    "2021-02-14",
    4
  ),(
    "feedback on fried beef",
    "delicious fried beef with good price",
    5,
    "2021-02-16",
    4
  ),(
    "feedback on fried beef",
    "delicious fried beef with expensive price",
    4,
    "2021-03-01",
    4
  ),(
    "feedback on fish_flavoered eggplant",
    "very delicious fish_flavoered eggplant with cheap price",
    4,
    "2021-02-14",
    5
  ),(
    "feedback on fish_flavoered eggplant",
    "delicious fish_flavoered eggplant with good price",
    3,
    "2021-02-16",
    5
  ),(
    "feedback on fish_flavoered eggplant",
    "delicious fish_flavoered eggplant with expensive price",
    2,
    "2021-03-01",
    5
  ),(
    "feedback on green pepper shredded pork",
    "very delicious green pepper shredded pork with cheap price",
    4,
    "2021-02-14",
    6
  ),(
    "feedback on green pepper shredded pork",
    "delicious green pepper shredded pork with good price",
    5,
    "2021-02-16",
    6
  ),(
    "feedback on green pepper shredded pork",
    "delicious green pepper shredded pork with expensive price",
    3,
    "2021-03-01",
    6
  );
  