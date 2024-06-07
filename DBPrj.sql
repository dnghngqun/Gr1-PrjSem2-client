CREATE DATABASE CourseManagement;

use CourseManagement;

CREATE TABLE Course(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name varchar(255) not null ,
    price decimal,
    category varchar(255),
    description varchar(255),
    status TINYINT
);



CREATE TABLE Account(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    userName varchar(255) not null ,
    password varchar(255) not null,
    email varchar(255) not null,
    phoneNumber varchar(255) not null,
    role enum('admin', 'customer', 'staff') not null
);

CREATE TABLE Order_(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    userId INT,
    totalPrice decimal,
    status TINYINT,
    FOREIGN KEY (userId) REFERENCES Account(id)
);

CREATE TABLE OrderDetail(
    id INT PRIMARY KEY AUTO_INCREMENT,
    courseId INT Not Null ,
    orderId int NOT NULL ,
    date DATE,
    deal decimal DEFAULT 0,
    quantity int ,
    totalAmount decimal,
    status tinyint,
    FOREIGN KEY (courseId) REFERENCES Course(id),
    FOREIGN KEY (orderId) REFERENCES Order_(id)
);

CREATE TABLE Payment(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    userId int,
    paymentMethod ENUM('Visa', 'MasterCard', 'COD'),
    orderDetailId int not null ,
    amount decimal,
    paymentDate DATE,
    status tinyint,
    FOREIGN KEY (userId) REFERENCES Account(id),
    FOREIGN KEY (orderDetailId) REFERENCES OrderDetail(id)
);





