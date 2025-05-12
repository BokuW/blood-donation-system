const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const hostname = "127.0.0.1";
const port = 3000; // Node.js server port

// MySQL connection using port 3307
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pass@12mysql",
  database: "Blood_Donation_System",
  port: 3307, // MySQL port
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1);
  }
  console.log(" Connected to MySQL database");
});

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname =
    parsedUrl.pathname === "/" ? "/index.html" : parsedUrl.pathname;
  const extname = path.extname(pathname);
  const filePath = path.join(__dirname, "public", pathname);

  // Serve static files from public/
  if (Object.keys(mimeTypes).includes(extname)) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("<h1>404 Not Found</h1>");
      }
      res.writeHead(200, { "Content-Type": mimeTypes[extname] });
      res.end(data);
    });
    return;
  }

  // Serve index.html explicitly
  if (pathname === "/index.html" && req.method === "GET") {
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        return res.end("<h1>Error loading page</h1>");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
    return;
  }

  // Handle form submissions
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = querystring.parse(body);
      console.log(" Received data:", data);

      if (pathname === "/donors") {
        const donor = {
          donor_name: data.donor_name,
          donor_age: parseInt(data.donor_age),
          donor_blood_type: data.donor_blood_type,
          donor_contact: data.donor_contact,
          donor_medical_report: data.donor_medical_report,
          donor_address: data.donor_address,
          bank_id: parseInt(data.bank_id) || 1,
        };
        db.query("INSERT INTO Donor SET ?", donor, (err) => {
          if (err) {
            console.error("❌ Donor insert error:", err);
            res.writeHead(500, { "Content-Type": "text/html" });
            return res.end("<h1>Error saving donor</h1>");
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h1>Donor registered successfully!</h1>");
        });

      } else if (pathname === "/recipients") {
        const patient = {
          patient_name: data.patient_name,
          patient_age: parseInt(data.patient_age),
          patient_blood_type: data.patient_blood_type,
          patient_contact: data.patient_contact,
          blood_seeker: data.blood_seeker,
          patient_medical_report: data.patient_medical_report,
        };
        db.query("INSERT INTO Patient SET ?", patient, (err) => {
          if (err) {
            console.error("❌ Patient insert error:", err);
            res.writeHead(500, { "Content-Type": "text/html" });
            return res.end("<h1>Error saving patient</h1>");
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h1> Patient registered successfully!</h1>");
        });

      } else if (pathname === "/blood_banks") {
        const bank = {
          bank_id: parseInt(data.bank_id),
          bank_name: data.bank_name,
          bank_contact: data.bank_contact,
          donor_names: data.donor_names,
          bank_address: data.bank_address,
        };
        db.query("INSERT INTO BloodBank SET ?", bank, (err) => {
          if (err) {
            console.error("❌ BloodBank insert error:", err);
            res.writeHead(500, { "Content-Type": "text/html" });
            return res.end("<h1>Error saving blood bank</h1>");
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h1> Blood bank registered successfully!</h1>");
        });

      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Form route not found</h1>");
      }
    });
    return;
  }
// GET /api/donors
if (req.method === 'GET' && parsedUrl.pathname === '/api/donors') {
  db.query('SELECT * FROM Donor', (err, results) => {
    if (err) return res.writeHead(500).end('DB Error');
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(results));
  });
  return;
}

// GET /api/patients
if (req.method === 'GET' && parsedUrl.pathname === '/api/patients') {
  db.query('SELECT * FROM Patient', (err, results) => {
    if (err) return res.writeHead(500).end('DB Error');
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(results));
  });
  return;
}

// GET /api/banks
if (req.method === 'GET' && parsedUrl.pathname === '/api/banks') {
  db.query('SELECT * FROM BloodBank', (err, results) => {
    if (err) return res.writeHead(500).end('DB Error');
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(results));
  });
  return;
}

  // Fallback 404
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("<h1>404 Not Found</h1>");
});

server.listen(port, hostname, () => {
  console.log(` Server running at http://${hostname}:${port}/`);
});
