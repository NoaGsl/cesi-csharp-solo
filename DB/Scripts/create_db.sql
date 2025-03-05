-- ------------------------------------------------------------
-- Table: departments
-- ------------------------------------------------------------

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL -- Reduced to 100, 255 is excessive for a department name
);

-- ------------------------------------------------------------
-- Table: locations
-- ------------------------------------------------------------

CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    city        VARCHAR(100) NOT NULL -- Adjusted to 100, as 255 is overkill for city names
);

-- ------------------------------------------------------------
-- Table: employees
-- ------------------------------------------------------------

CREATE TABLE employees (
    employee_id           SERIAL PRIMARY KEY,
    first_name            VARCHAR(50) NOT NULL, -- 50 is generally enough for first names
    last_name             VARCHAR(50) NOT NULL, -- 50 is also enough for last names
    landline_phone_number VARCHAR(20) NOT NULL, -- 25 is excessive, most numbers fit in 20
    mobile_phone_number   VARCHAR(20) NOT NULL, -- Same as above
    email                 VARCHAR(150) NOT NULL UNIQUE, -- 150 is enough for emails
    location_id           INT NOT NULL,
    department_id         INT NOT NULL,

    CONSTRAINT fk_employees_location FOREIGN KEY (location_id) 
        REFERENCES locations(location_id) ON DELETE CASCADE,
    
    CONSTRAINT fk_employees_department FOREIGN KEY (department_id) 
        REFERENCES departments(department_id) ON DELETE CASCADE
);
