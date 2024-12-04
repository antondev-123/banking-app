# Banking App

This is a **browser-based banking application** built with **Next.js**, **TypeScript**, and **Material-UI (MUI)** for the frontend, and **Node.js**, **Prisma**, and **PostgreSQL** for the backend. It provides basic banking functionalities such as depositing money, withdrawing money, transferring money to IBAN accounts, and viewing account statements.

---

## Features

### User Features
- **Deposit Money**: Add funds to your account.
- **Withdraw Money**: Withdraw funds from your account.
- **Transfer Money**: Transfer money to other IBAN accounts with proper IBAN validation.
- **View Account Statement**: Display a sorted list of transactions by date, showing the amount and current balance.

### Application Details
- **Responsive Design**: Supports devices with a minimum width of 360px.
- **IBAN Validation**: Ensures that users can only transfer funds to valid IBAN accounts.
- **Material-UI Integration**: Provides a modern and intuitive UI/UX.
- **No Authentication**: App is open for usage without user login.

---

## Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router with TypeScript)
- **Styling**: [Material-UI (MUI)](https://mui.com/)
- **State Management**: React `useState` and props

### Backend
- **Framework**: Node.js with API routes in Next.js
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (Dockerized)

### Development Tools
- **Package Manager**: npm
- **Database**: Dockerized PostgreSQL
- **Testing**: Jest (if tests are implemented)
- **Deployment**: Vercel for frontend and backend

---

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/your-username/banking-app.git
cd banking-app
