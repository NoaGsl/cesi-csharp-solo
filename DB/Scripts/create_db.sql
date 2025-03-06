-- ------------------------------------------------------------
-- Table: departments
-- ------------------------------------------------------------

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL
);

-- ------------------------------------------------------------
-- Table: locations
-- ------------------------------------------------------------

CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    city        VARCHAR(100) NOT NULL
);

-- ------------------------------------------------------------
-- Table: employees
-- ------------------------------------------------------------

CREATE TABLE employees (
    employee_id           SERIAL PRIMARY KEY,
    first_name            VARCHAR(50) NOT NULL,
    last_name             VARCHAR(50) NOT NULL,
    landline_phone_number VARCHAR(20) NOT NULL,
    mobile_phone_number   VARCHAR(20) NOT NULL,
    email                 VARCHAR(150) NOT NULL UNIQUE,
    is_admin              BOOLEAN DEFAULT FALSE NOT NULL,
    join_date             DATE NOT NULL DEFAULT CURRENT_DATE,
    leave_date            DATE DEFAULT NULL,
    location_id           INT NOT NULL,
    department_id         INT NOT NULL,

    CONSTRAINT fk_employees_location FOREIGN KEY (location_id) 
        REFERENCES locations(location_id) ON DELETE CASCADE,
    
    CONSTRAINT fk_employees_department FOREIGN KEY (department_id) 
        REFERENCES departments(department_id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Table: admins
-- ------------------------------------------------------------

CREATE TABLE admins (
    admin_id SERIAL PRIMARY KEY,  
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    employee_id INT NOT NULL UNIQUE,

    CONSTRAINT fk_admins_employee FOREIGN KEY (employee_id) 
        REFERENCES employees(employee_id) ON DELETE CASCADE
);
