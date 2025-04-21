create table outlets
(
    outlet_id   serial
        constraint "PK_49cc5c13c3f3c1a12052d13b261"
            primary key,
    outlet_code varchar not null
        constraint "UQ_b3dc9ca1f459505130ddbcab22e"
            unique,
    outlet_name varchar not null
);

alter table outlets
    owner to postgres;

