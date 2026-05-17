---
title: "SQL DDL Commands: Create, Alter & Drop"
slug: "sql-ddl-commands-guide"
date: 2025-01-15
description: "Complete guide to SQL Data Definition Language (DDL). Learn to Create, Alter, and Drop databases and tables with constraints."
showToc: true
weight: 2
series: ["DBMS"]
categories: ["DBMS", "SQL"]
tags: ["DDL", "CREATE", "ALTER", "DROP", "Constraints", "SQL"]
summary: "Master DDL commands in SQL. Covers database creation, schema modification, data types, and implementing primary/foreign key constraints."
---

# DDL Commands Reference Guide

## What is DDL?

**DDL (Data Definition Language)** commands are SQL statements used to define and modify the structure of database objects like databases, tables, and their properties.

---

## 1. Database Operations

### Create Database
```sql
CREATE DATABASE database_name;
```

### Show All Databases
```sql
SHOW DATABASES;
```

### Drop Database
```sql
DROP DATABASE database_name;
```

### Use Database
```sql
USE database_name;
```

### Examples:
```sql
-- Create a new database
CREATE DATABASE school_management;

-- Show all databases
SHOW DATABASES;

-- Select database to work with
USE school_management;

-- Delete database (careful!)
DROP DATABASE old_database;
```

---

## 2. Basic Data Types

### Common Data Types:

| Data Type | Description | Example |
|-----------|-------------|---------|
| **INT** | Integer numbers | `age INT` |
| **CHAR(n)** | Fixed-length string | `gender CHAR(1)` |
| **VARCHAR(n)** | Variable-length string | `name VARCHAR(100)` |
| **FLOAT** | Floating-point numbers | `price FLOAT` |
| **DOUBLE** | Double-precision numbers | `salary DOUBLE` |
| **DATE** | Date values | `birth_date DATE` |

> **Note:** For more data types, refer to book pages 114-115

---

## 3. Table Operations

### Show All Tables
```sql
SHOW TABLES;
```

### Describe Table Structure
```sql
DESC table_name;

```

### Create Table
```sql
CREATE TABLE table_name (
    column1 data_type,
    column2 data_type,
    column3 data_type
);
```

### Examples:
```sql
-- Create a basic table
CREATE TABLE students (
    student_id INT,
    name VARCHAR(100),
    age INT,
    grade CHAR(2)
);

-- Show all tables
SHOW TABLES;

-- View table structure
DESC students;
```

---

## 4. Alter Table Operations

### Add New Column
```sql
ALTER TABLE table_name ADD column_name data_type;
```

### Drop Column
```sql
ALTER TABLE table_name DROP  column_name;
```

### Modify Column Data Type
```sql
ALTER TABLE table_name MODIFY column_name new_data_type;
```

### Change Column Name and Data Type
```sql
ALTER TABLE table_name CHANGE old_column_name new_column_name new_data_type;
```

### Drop Table
```sql
DROP TABLE table_name;
```

### Examples:
```sql
-- Add new column
ALTER TABLE students ADD email VARCHAR(100);

-- Drop a column
ALTER TABLE students DROP  age;

-- Modify column data type
ALTER TABLE students MODIFY name VARCHAR(150);

-- Change column name and type
ALTER TABLE students CHANGE grade class_grade VARCHAR(10);

-- Delete entire table
DROP TABLE old_students;
```

---

## 5. Domain Constraints

### 5.1 DEFAULT Constraint

Sets a default value for a column when no value is specified.

```sql
CREATE TABLE table_name (
    column1 data_type DEFAULT 'default_value',
    column2 data_type DEFAULT default_number
);
```

**Example:**
```sql
CREATE TABLE employees (
    name CHAR(100) DEFAULT 'nirajan',
    id INT(100) DEFAULT 1,
    department VARCHAR(50) DEFAULT 'General'
);
```

### 5.2 NOT NULL Constraint

Ensures a column cannot have empty values.

```sql
CREATE TABLE table_name (
    column_name data_type NOT NULL
);
```

**Example:**
```sql
CREATE TABLE customers (
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```

### 5.3 UNIQUE Constraint

Ensures all values in a column are different.

```sql
CREATE TABLE table_name (
    column_name data_type UNIQUE
);
```

**Example:**
```sql
CREATE TABLE users (
    username VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE
);
```

### 5.4 PRIMARY KEY Constraint

Uniquely identifies each record in a table.

#### Method 1: Direct Declaration
```sql
CREATE TABLE table_name (
    column_name data_type PRIMARY KEY,
    other_column data_type
);
```

#### Method 2: Separate Declaration
```sql
CREATE TABLE table_name (
    column1 data_type,
    column2 data_type,
    PRIMARY KEY(column1)
);
```

**Examples:**
```sql
-- Method 1
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Method 2
CREATE TABLE orders (
    order_id INT,
    customer_id INT,
    PRIMARY KEY(order_id)
);
```

### 5.5 CHECK Constraint

Validates data based on a condition.

```sql
CREATE TABLE table_name (
    column_name data_type,
    CHECK (condition)
);
```

**Example:**
```sql
CREATE TABLE students (
    student_id INT,
    age INTEGER,
    CHECK (age >= 18 AND age <= 100)
);
```

### 5.6 Combining Multiple Constraints

```sql
CREATE TABLE table_name (
    column1 data_type constraint1 constraint2 CHECK(condition),
    PRIMARY KEY(column1)
);
```

**Example:**
```sql
CREATE TABLE employees (
    emp_id INT,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age < 65),
    PRIMARY KEY(emp_id)
);
```

---

## 6. Composite Primary Key

When multiple columns together form the primary key.

```sql
CREATE TABLE table_name (
    column1 data_type,
    column2 data_type,
    column3 data_type,
    column4 data_type,
    PRIMARY KEY(column1, column2)
);
```

**Example:**
```sql
CREATE TABLE class_enrollment (
    student_id INT,
    class_id INT,
    section CHAR(1),
    roll_no INT,
    PRIMARY KEY(student_id, roll_no)
);
-- student_id AND roll_no together form the composite primary key
```

### Searching with Composite Primary Key:
```sql
-- Must use both columns in WHERE clause
SELECT * FROM class_enrollment 
WHERE student_id = 101 AND roll_no = 25;
```

---

## 7. Foreign Key Constraint

Links two tables together and maintains referential integrity.

```sql
CREATE TABLE table_name (
    column1 data_type PRIMARY KEY,
    column2 data_type,
    FOREIGN KEY (column2) REFERENCES parent_table(parent_column)
);
```

**Example:**
```sql
-- Parent table (must exist first)
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Child table with foreign key
CREATE TABLE enrollments (
    teacher_id INT PRIMARY KEY,
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
```

### How Foreign Key Validation Works:

**Before inserting or updating** a record in the child table:
1. **If the foreign key value exists** in the parent table → Operation is **allowed**
2. **If the foreign key value does not exist** in the parent table → MySQL gives an **error** (foreign key constraint violation)

**Example Validation:**
```sql
-- This will work if student_id 101 exists in students table
INSERT INTO enrollments VALUES (1, 101);

-- This will fail if student_id 999 doesn't exist in students table  
INSERT INTO enrollments VALUES (2, 999); -- ERROR!
```

---



Advantahe of referential integrity:
-  If the record from parent table is deleted , refential integrity allows delelete all the records from child table which are related to that record.
- If the parent record doesnt exist, it will not allow to insert the child record with that parent record id.
-If the parent record is updated, referential integrity will help to update the child record with the new parent record id.



---
## 8. Views in SQL

### What is a View?

A View is a virtual table in SQL.
It does not store data physically.
It displays data from one or more existing tables using a stored SELECT query.

A view is essentially a saved query.

---

### Why Use Views?

* Simplify complex SQL queries
* Improve security by hiding columns or rows
* Reuse queries
* Provide abstraction over tables

---

### Advantages of Views

* Integrity constraints of base tables still apply
* Always shows updated data from base tables
* Helps in restricting access to sensitive data
* Improves query readability and reuse

---

### Limitation of Views

* Views do not store data physically
* Some views are not updatable depending on complexity

---

### Create View Syntax

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

---

### Example

```sql
CREATE VIEW student_view AS
SELECT student_id, student_name, gpa
FROM Students
WHERE gpa > 3.0;
```

---

### Using Views

#### Query a View

```sql
SELECT * FROM student_view WHERE gpa > 3.2;
```

#### Update through View

```sql
UPDATE student_view
SET gpa = 3.8
WHERE student_name = 'Alice';
```

Changes will reflect in the base table if the view is updatable.

---

#### Drop a View

```sql
DROP VIEW student_view;
```

---

## 9. Triggers in SQL

### What is a Trigger?

A Trigger is a stored procedure that executes automatically when a specific event occurs in the database.
It does not require manual execution.

---

### Event-Condition-Action Model

Triggers follow the Event-Condition-Action model:

Event: INSERT, UPDATE, DELETE
Condition: Optional condition using WHEN
Action: SQL statements executed if condition is satisfied

---

### Types of Events

* INSERT: triggered when a new row is inserted
* UPDATE: triggered when a row is updated
* DELETE: triggered when a row is deleted

---

### Timing of Triggers

* BEFORE: executed before the event
* AFTER: executed after the event

---

### General Syntax

```sql
CREATE TRIGGER trigger_name
{BEFORE | AFTER} {INSERT | UPDATE | DELETE}
ON table_name
FOR EACH ROW
WHEN condition
BEGIN
    SQL statements
END;
```

---

### Example 1: Overdraft Trigger

```sql
CREATE TRIGGER overdraft
AFTER UPDATE ON pre_paid
FOR EACH ROW
WHEN NEW.balance < 0
UPDATE pre_paid
SET blocked = 'T';
```

If balance becomes negative after update, the account is blocked.

---

### Example 2: Backup Trigger

```sql
CREATE TRIGGER backup
AFTER DELETE ON pre_paid
FOR EACH ROW
INSERT INTO pre_paid_backup (id, balance, blocked)
VALUES (OLD.id, OLD.balance, OLD.blocked);
```

When a row is deleted, it is copied into a backup table.

---

### NEW and OLD Values

* NEW refers to the new row after INSERT or UPDATE
* OLD refers to the old row before DELETE or UPDATE

---

### Use Cases of Triggers

* Audit logging
* Data backup
* Enforcing complex rules
* Automatically updating related tables

---

### Advantages

* Automatic execution
* Maintains data integrity
* Useful for logging and auditing

---

### Disadvantages

* Hard to debug
* Can reduce performance
* Hidden logic inside database

---
