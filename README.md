# MoneyMate

![MoneyMate](https://i.ibb.co/zb0XHYL/Screenshot-from-2025-01-19-17-28-33.png)

**MoneyMate** is a full-stack application that helps users manage their finances by tracking their income and expenses. With an intuitive interface, users can add, view, edit, and delete transactions, categorize them as income or expense, and easily track their balance over time. The application is built with **React** for the frontend and **Express.js** with **MongoDB** for the backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Track Income & Expenses**: Add, view, edit, and delete transactions.
- **Categorize Transactions**: Mark transactions as income or expense with easy-to-understand categories.
- **Real-Time Balance**: View a live balance of your finances.
- **Responsive Design**: The application is fully responsive and works seamlessly on both mobile and desktop.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework to create beautiful and responsive UIs.
- **Axios**: A promise-based HTTP client for making API requests.

### Backend
- **Express.js**: A minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing transactions and user data.
- **Mongoose**: A MongoDB Object Data Modeling (ODM) library for Node.js.
- **Cors**: Middleware to allow Cross-Origin Resource Sharing for client-server communication.
- **Dotenv**: A module to manage environment variables securely.


## Installation

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mask-shakill/MoneyMate.git
   cd MoneyMate/server
   npm install
   node server.js ```

### client setup
```bash
git clone https://github.com/mask-shakill/MoneyMate.git
cd MoneyMate/client
npm install
npm run dev ``` 

# MoneyMate API Endpoints

## API Endpoints

### 1. **POST** `/api/transactions/add`
- Add a new transaction (either income or expense).

### 2. **GET** `/api/transactions`
- Fetch all transactions.

### 3. **GET** `/api/transactions/:id`
- Fetch a specific transaction by ID.

### 4. **PUT** `/api/transactions/:id`
- Update a specific transaction by ID.

### 5. **DELETE** `/api/transactions/:id`
- Delete a specific transaction by ID.






