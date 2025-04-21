create table attendances
(
    id              serial
        constraint "PK_483ed97cd4cd43ab4a117516b69"
            primary key,
    attendance_date date                             not null,
    attendance_type attendances_attendance_type_enum not null,
    attendance_time time                             not null,
    employee_id     integer
        constraint "FK_43dca8b4751d7449a38b583991c"
            references employees,
    outlet_id       integer
        constraint "FK_55ef9ce79c6e7cf79ed4735992f"
            references outlets
);

alter table attendances
    owner to postgres;

