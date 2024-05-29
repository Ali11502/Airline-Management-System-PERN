-- Database: Airline Management System - Database (Final)

-- DROP DATABASE IF EXISTS "Airline Management System - Database (Final)";

CREATE DATABASE "Airline Management System - Database (Final)"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
---------------------------- For Customer Facing Tasks ------------------------------------
--Users Table
CREATE TABLE USERS (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 8),
    -- Email Format Check Constraint
    CONSTRAINT CHK_EmailFormat CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

--Testing
INSERT INTO USERS (name, email, password) VALUES ('Test User', 'alice@example.com', 'password123');
INSERT INTO USERS (name, email, password, isAdmin) VALUES ('Test Admin', 'bob@example.com', 'securepass', true);

Select * from USERS

--Aircraft Table
CREATE TABLE Aircraft (
    aircraftid VARCHAR(255) PRIMARY KEY,
    aname VARCHAR(255) NOT NULL,
    totalseats INTEGER NOT NULL,
    astatus VARCHAR(50) NOT NULL
);


--Aircraft ID Generation
CREATE SEQUENCE aircraft_sequence START 101;

CREATE OR REPLACE FUNCTION set_aircraft_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.aircraftid := 'PK-' || nextval('aircraft_sequence')::TEXT;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_aircraft_id_trigger
BEFORE INSERT ON Aircraft
FOR EACH ROW EXECUTE FUNCTION set_aircraft_id();

--Testing
INSERT INTO Aircraft (aname, totalseats, astatus) VALUES ('Boeing 737', 150, 'Active');
INSERT INTO Aircraft (aname, totalseats, astatus) VALUES ('Airbus 121', 250, 'Active');

Select * from Aircraft

DROP Table Flight
--Flight Table
CREATE TABLE Flight (
	flightid SERIAL PRIMARY KEY,
    aircraftid VARCHAR(255) REFERENCES Aircraft(aircraftid),
    dep VARCHAR(255) NOT NULL,
    arr VARCHAR(255) NOT NULL,
    deptime TIME NOT NULL,
    arrtime TIME NOT NULL,
    avbseats INTEGER NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    duration INTEGER NOT NULL,
    price INTEGER NOT NULL,
    CONSTRAINT CHK_DepArr CHECK (dep <> arr),
    CONSTRAINT CHK_DepTimeArrTime CHECK (deptime < arrtime),
    CONSTRAINT CHK_PositiveSeats CHECK (avbseats >= 0),
    CONSTRAINT CHK_PositivePrice CHECK (price >= 0)
);

--Testing
INSERT INTO Flight (aircraftid, dep, arr, deptime, arrtime, avbseats, date, status, duration, price)
VALUES ('PK-103','Karachi', 'Lahore', '08:00:00', '10:30:00', 150, '2023-12-31', 'Scheduled', 150, 500);
Select * from Flight;


--Passenger Table
CREATE TABLE Passenger (
    passengerid SERIAL PRIMARY KEY,
    id INTEGER REFERENCES USERS(id),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passport VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL
);

--Testing
INSERT INTO Passenger (id, name, phone, email, passport, dob, gender) VALUES 
(1, 'Test Passenger', '1234567890', 'testpassenger@example.com', 'AB123456', '1990-01-15', 'Male');

Select * from Passenger;  

--Reservation Table
CREATE TABLE Reservation (
    reservationid SERIAL PRIMARY KEY,
    passengerid INTEGER REFERENCES Passenger(passengerid),
    flightid INTEGER REFERENCES Flight(flightid),
    id INTEGER REFERENCES USERS(id),
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(50) NOT NULL
);


--Testing
INSERT INTO Reservation (passengerid, flightid, id, date, time, status) VALUES 
(1, 1, 3, '2023-12-03', '08:00:00', 'Waiting');

Select * from Reservation
Select * from USERS

--Payment Table
CREATE TABLE Payment (
    paymentid SERIAL PRIMARY KEY,
    reservationid INTEGER REFERENCES Reservation(reservationid),
    id INTEGER REFERENCES USERS(id),
    status VARCHAR(50) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL
);

--Testing
INSERT INTO Payment (reservationid, id, status, amount, date, time) VALUES 
(1, 1, 'Successful', 500, '2023-12-03', '08:15:00');

Select * from Payment


--FUNCTIONS FOR BACKEND API


-- Function for searching flights given date, dep_city, and arr_city
CREATE OR REPLACE FUNCTION search_flights(
    dep_date DATE,
    dep_city VARCHAR(255),
    arr_city VARCHAR(255)
) RETURNS TABLE (
    aircraftid VARCHAR(255),
    flightid INT,
    dep VARCHAR(255),
    arr VARCHAR(255),
    deptime TIME,
    arrtime TIME,
    avbseats INT,
    flight_date DATE,
    flight_status VARCHAR(255),
    flight_duration INTEGER,
    flight_price INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        Flight.aircraftid,
        Flight.flightid,
        Flight.dep,
        Flight.arr,
        Flight.deptime,
        Flight.arrtime,
        Flight.avbseats,
        Flight.date AS flight_date,
        Flight.status AS flight_status,
        Flight.duration AS flight_duration,
        Flight.price AS flight_price
    FROM Flight
    WHERE
        Flight.dep = dep_city
        AND Flight.arr = arr_city
        AND Flight.date BETWEEN dep_date - INTERVAL '1 day' AND dep_date + INTERVAL '1 day'
		AND Flight.avbseats > 0
		AND Flight.status = 'Scheduled';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No matches found for the specified route and date range.';
    END IF;
END;
$$ LANGUAGE plpgsql;

--Testing the Procedure
INSERT INTO Flight (aircraftid, dep, arr, deptime, arrtime, avbseats, date, status, duration, price)
VALUES
    ('PK-103', 'Karachi', 'Lahore', '08:00:00', '11:00:00', 100, '2023-12-29', 'Scheduled', 3, 250.00),
	('PK-104', 'Karachi', 'Lahore', '08:00:00', '11:00:00', 100, '2023-12-30', 'Scheduled', 3, 250.00),
	('PK-103', 'Karachi', 'Lahore', '08:00:00', '11:00:00', 100, '2023-12-28', 'Scheduled', 3, 250.00)

INSERT INTO Flight (aircraftid, dep, arr, deptime, arrtime, avbseats, date, status, duration, price)
VALUES ('PK-103', 'Karachi', 'Lahore', '09:00:00', '12:00:00', 0, '2023-12-29', 'Scheduled', 3, 250.00);
SELECT * FROM search_flights('2023-12-29', 'Karachi', 'Lahore');



--Function for Making a Tentative Reservation
DROP FUNCTION tentative_reservation
CREATE OR REPLACE FUNCTION tentative_reservation(
    p_id INTEGER,
    p_name VARCHAR(255),
    P_phone VARCHAR(15),
    p_email VARCHAR(255),
    p_passport VARCHAR(20),
    p_dob DATE,
    p_gender VARCHAR(10),
    p_flightid INTEGER,
    p_date DATE,
    p_time TIME 
) 
RETURNS INTEGER AS $$
DECLARE
    v_passenger_id INTEGER;
    v_reservation_id INTEGER;
    v_availability INTEGER;
BEGIN
    -- Check if there are available seats in the specified flight
    SELECT avbseats INTO v_availability
    FROM Flight
    WHERE flightid = p_flightid;

    IF v_availability > 0 THEN
        -- Insert data into Passenger table
        INSERT INTO Passenger (id, name, phone, email, passport, dob, gender)
        VALUES (p_id, p_name, p_phone, p_email, p_passport, p_dob, p_gender)
        RETURNING passengerid INTO v_passenger_id;

        -- Insert data into Reservation table
        INSERT INTO Reservation (passengerid, flightid, id, date, time, status)
        VALUES (v_passenger_id, p_flightid, p_id, p_date, p_time, 'Waiting')
        RETURNING reservationid INTO v_reservation_id;

        RAISE NOTICE 'Passenger ID: %, Reservation ID: %', v_passenger_id, v_reservation_id;
        
        -- Return the reservation ID
        RETURN v_reservation_id;
    ELSE
        RAISE NOTICE 'No available seats for the specified flight. Reservation not made.';
        
        -- Return NULL if reservation not made
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql;



--Testing the Procedure
SELECT tentative_reservation(1, 'Test Passenger 4', '1324567890', 'testpassenger2@example.com', 'AB143456', '1990-01-16', 'Female', 3, '2023-12-03', '08:15:00');
Select * from Flight
Select * from Reservation
Select * from Passenger



--Payment and Reservation stored Procedure
CREATE OR REPLACE PROCEDURE process_payment_and_update_reservation(
    p_reservationid INTEGER,
    p_id INTEGER,
    p_pstatus VARCHAR(50),
    p_pamount INTEGER,
    p_pdate DATE,
    p_ptime TIME
) AS $$
DECLARE
    v_flightid INTEGER;
BEGIN
    -- Insert data into Payment table
    INSERT INTO Payment (reservationid, id, status, amount, date, time)
    VALUES (p_reservationid, p_id, p_pstatus, p_pamount, p_pdate, p_ptime);

    -- Update status in Reservation table from Waiting to Confirmed
    UPDATE Reservation
    SET status = 'Confirmed'
    WHERE reservationid = p_reservationid;

    -- Get flightid from Reservation
    SELECT flightid INTO v_flightid
    FROM Reservation
    WHERE reservationid = p_reservationid;

    -- Decrease available seats in Flight table by 1
    UPDATE Flight
    SET avbseats = avbseats - 1
    WHERE flightid = v_flightid;

    RAISE NOTICE 'Payment processed successfully, Reservation ID: %, Flight ID: %', p_reservationid, v_flightid;
END;
$$ LANGUAGE plpgsql;



--Testing the Procedure
CALL process_payment_and_update_reservation(
    2,
    1,
    'Paid',
    250,
    '2023-12-01',
    '10:30:00'
);

Select * from Flight
Select * from Reservation
Select * from Payment

DROP Function cancel_reservation

--Cancelling a reservation Procedure
CREATE OR REPLACE PROCEDURE cancel_reservation(
    p_reservationid INTEGER
) AS $$
DECLARE
    v_flightid INTEGER;
    v_passengerid INTEGER;
BEGIN
    -- Check if the reservation exists
    IF EXISTS (
        SELECT 1
        FROM Reservation
        WHERE reservationid = p_reservationid
    ) THEN
        -- Get flightid and passengerid from Reservation
        SELECT flightid, passengerid INTO v_flightid, v_passengerid
        FROM Reservation
        WHERE reservationid = p_reservationid;

        -- Nullify the reservationid in the Payment table
        UPDATE Payment
        SET reservationid = NULL
        WHERE reservationid = p_reservationid;

        -- Increase available seats in Flight table by 1
        UPDATE Flight
        SET avbseats = avbseats + 1
        WHERE flightid = v_flightid;

        -- Delete the reservation
        DELETE FROM Reservation
        WHERE reservationid = p_reservationid;

        -- Delete the passenger
        DELETE FROM Passenger
        WHERE passengerid = v_passengerid;

        RAISE NOTICE 'Reservation canceled successfully, Reservation ID: %, Flight ID: %', p_reservationid, v_flightid;
    ELSE
        RAISE NOTICE 'Reservation not found with ID: %', p_reservationid;
    END IF;
END;
$$ LANGUAGE plpgsql;



-- Testing the Procedure
CALL cancel_reservation(19);
Select * from Flight;
Select * from Reservation;
Select * from Passenger;
Select * from Payment;



--------- For Internal Tasks (eg Managing Pilots, Engineers, Crew .etc ) -----------

CREATE TABLE EMPLOYEE (
    employeeid SERIAL PRIMARY KEY,
    managerid INTEGER REFERENCES EMPLOYEE(employeeid),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('pilot', 'engineer', 'crew', 'manager')) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 8),
    -- Email Format Check Constraint
    CONSTRAINT CHK_EmailFormat CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

Select * from Employee

DROP TABLE EngineerAssignments
CREATE TABLE PilotAssignments (
  AssignmentID SERIAL PRIMARY KEY,
  employeeid INT REFERENCES EMPLOYEE(employeeid) NOT NULL,
  flightid INT REFERENCES Flight(flightid),
  AssignmentStatus VARCHAR(20) NOT NULL,
  CONSTRAINT unique_employee_flight_assignment UNIQUE (employeeid, flightid)
);

DROP Table CrewAssignments
CREATE TABLE CrewAssignments (
  AssignmentID SERIAL PRIMARY KEY,
  employeeid INT REFERENCES EMPLOYEE(employeeid) NOT NULL,
  flightid INT REFERENCES Flight(flightid),
  AssignmentStatus VARCHAR(20) NOT NULL,
	CONSTRAINT unique_employee_crew_assignment UNIQUE (employeeid, flightid)
);

CREATE TABLE EngineerAssignments (
  AssignmentID SERIAL PRIMARY KEY,
  employeeid INT REFERENCES EMPLOYEE(employeeid) NOT NULL,
  aircraftid VARCHAR(255) REFERENCES Aircraft(aircraftid),
  AssignmentDate DATE NOT NULL,
  CompletionDate DATE,
  AssignmentStatus VARCHAR(20) NOT NULL,
	CONSTRAINT unique_employee_engineer_assignment UNIQUE (employeeid, aircraftid)
);


