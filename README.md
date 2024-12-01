# **Permalist Project**

Permalist is a simple task management application built with **Node.js**, **Express.js** and **PostgreSQL** that allows users to:
- Add new tasks to the list.
- Edit existing tasks.
- Delete tasks from the list.

---

## **How to use**

### **1. Clone the Repository**
```bash
git clone https://github.com/Valy2255/Permalist.git
cd Permalist
```

### **2. Install Dependencies**
Be sure that you have Node.js installed, then run:
```bash
npm install
```

### **3. Set Up PostgreSQL**
1. Create a PostgreSQL database named `permalist`:
   ```sql
   CREATE DATABASE permalist;
   ```

2. Create the `items` table:
   ```sql
   CREATE TABLE items (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL
   );
   ```

### **4. Configure Environment Variables**
Create a `.env` file in the root directory and add the following configuration:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=permalist
DB_PASSWORD=123456
DB_PORT=5432
```

### **5. Start the Server**
```bash
node index.js
```
The server will start at `http://localhost:3000`.

