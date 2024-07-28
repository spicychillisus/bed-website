const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}


bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);
    
  const SQLSTATEMENT = `
    DROP TABLE IF EXISTS User;

    DROP TABLE IF EXISTS Task;
    
    DROP TABLE IF EXISTS TaskProgress;
    
    DROP TABLE IF EXISTS vehicle;
    
    DROP TABLE IF EXISTS ownership;
    
    DROP TABLE IF EXISTS messages;
    
    CREATE TABLE User (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        username TEXT,
        email TEXT,
        password TEXT
    );
    
    CREATE TABLE Task (
        task_id INT PRIMARY KEY AUTO_INCREMENT,
        title TEXT,
        description TEXT,
        points INT
    
    );
    
    CREATE TABLE TaskProgress (
        progress_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        task_id INT NOT NULL,
        completion_date TIMESTAMP,
        notes TEXT
    
    );
    
    CREATE TABLE vehicle (
        vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
        vehicle_name TEXT,
        category TEXT,
        vehicle_description TEXT,
        points_needed INT NOT NULL,
        added_by_user_id INT NOT NULL
    );
    
    CREATE TABLE ownership (
        id INT PRIMARY KEY AUTO_INCREMENT,
        vehicle_id INT NOT NULL,
        user_id INT NOT NULL
    );
    
    CREATE TABLE messages (
        message_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        
    );
    
    INSERT INTO User (username, email, password) VALUES
    ("testuser", "admin@hotmail.com", "${hash}");
    
    
    INSERT INTO Task (title, description, points) 
    VALUES
    ("Plant a Tree", "Plant a tree in your neighbourhood or a designated green area." , 50),
    ("Use Public Transportation", "Use public transportation or carpool instead of driving alone." , 30),
    ("Reduce Plastic Usage", "Commit to using reusable bags and containers." , 40),
    ("Energy Conservation", "Turn off lights and appliances when not in use." , 25),
    ("Composting", "Start composting kitchen scraps to create natural fertilizer" , 35);
    
    INSERT INTO vehicle (vehicle_name, category, vehicle_description, points_needed, added_by_user_id)
    VALUES
    ("Ferrari SF23", "CAR", "This is the Formula 1 car that Carlos Sainz drove to win the Singapore Grand Prix in 2023", 300, 1),
    ("Mercedes Benz O405 Hispano Carocerra", "BUS", "This particular bus model was a common sight in the early 2000s, and was operated by Trans Island and SMRT", 290, 1),
    ("Airbus A380-800", "PLANE", "This is the largest commercial aircraft in the world.", 1500, 1),
    ("Ferrari F2004", "CAR", "This is the car that Micheal Schumacher used to clinch his 7th World Championship with Ferrari.", 3900, 1),
    ("McLaren MP4-17", "CAR", "This is the car with which the McLaren team competed in the 2002 and 2003 Formula One World Championships. The chassis was designed by Adrian Newey, Mike Coughlan, Neil Oatley and Peter Prodromou with Mario Illien designing the bespoke Ilmor engine. The car was driven by Briton David Coulthard and Finn Kimi Räikkönen in both seasons.", 7000, 1);
    
    INSERT INTO messages (user_id, message) VALUES
    (1, "man i love bed");
      `

    pool.query(SQLSTATEMENT, callback);
  }
});
