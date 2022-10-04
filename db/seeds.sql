insert into department (dept_name)
values ('Hitting'),
       ('Pitching'),
       ('Fielding'),
       ('Coaching Staff');

insert into roles (title, salary, department_id)
values ('Designated Hitter', 300, 1),
       ('Starting Pitcher', 450, 2),
       ('Third Baseman', 400, 3),
       ('Bench Coach', 350, 4);

insert into employee (first_name, last_name, role_id) 
VALUES ('Albert', 'Pujols', 1),
       ('Adam', 'Wainwright', 2),
       ('Nolan', 'Arenado', 3),
       ('Skip', 'Schumaker', 4);

