create table employees
(
    employee_id   serial
        constraint "PK_c9a09b8e6588fb4d3c9051c8937"
            primary key,
    employee_code varchar not null
        constraint "UQ_56162b5f24af743a154680684f5"
            unique,
    employee_name varchar not null
);

alter table employees
    owner to postgres;

