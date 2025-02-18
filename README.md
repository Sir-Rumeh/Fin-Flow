# EasyPay Admin Portal

## Overview

The **EasyPay Admin Portal** is a comprehensive platform designed to streamline the management of mandates for both bank staff and external merchants, such as **Fair Money**. The system features **dual user layouts**, ensuring appropriate access and functionality for each user type.

## Key Features

- **Mandate Management** – Centralized control over mandates for the bank and merchants, facilitating creation, modification, and tracking.
- **Dual User Layouts** – Separate dashboards for **bank staff** and **merchant users**, providing role-based access.
- **Audit Trail** – Tracks user actions within the portal, ensuring transparency and accountability.
- **Maker-Checker Process** – Ensures structured approvals for critical operations.
- **Reports & Analytics** – Access to mandate and transaction reports.

## Portal Layouts

### 1️⃣ Staff Admin Layout

Designed for **bank staff**, providing a full range of modules for operational management.

#### 🔹 Modules:

- **Merchant Management** – Onboard and manage merchants.
- **Mandate Management** – Handle mandates for various merchants.
- **Account Management** – Manage accounts linked to merchants.
- **Profile Management** – Create and manage user profiles under merchant accounts.
- **Requests** – Structured approval-based request management.
- **Audit Trail** – Tracks all user actions for security.
- **Reports** – Generate and view mandate and transaction reports.
- **Staff User Management** – Manage staff onboarding and updates with a maker-checker process.
- **Role Permissions** – Assign module-specific access to user groups.

### 2️⃣ Merchant Layout

Designed for **merchant-assigned users** (e.g., Fair Money) with limited access to their own data and operations.

#### 🔹 Modules:

- **Mandate Management** – Manage mandates specific to the merchant’s business.
- **Profile Management** – Manage profiles under merchant accounts.
- **Requests** – Submit and approve mandate-related requests.
- **Audit Trail** – Monitor user activities.
- **Reports** – Access mandate and transaction reports.

## Access Controls

- **Staff Users** – Full access to manage merchants and bank-related operations, customizable via role permissions.
- **Merchant Users** – Limited access to their own merchant-specific data and operations.

## Maker-Checker Process

All actions involving **mandates, accounts, profiles, and requests** must go through a **maker-checker approval workflow**, ensuring proper authorization before execution.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- Git

### Installation
1. **Clone the Repository:**
   ```sh
   git clone {{REPO_URL}}
   cd easypay-admin
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

3. **Start the Development Server:**
   ```sh
   npm start
   ```
   or
   ```sh
   yarn start
   ```

4. **Access the Application:**
   - Open `http://localhost:3000` in your browser.

## Conclusion

The **EasyPay Admin Portal** provides a secure and efficient solution for managing mandates and user profiles. With its **dual-layout system**, structured **approval workflows**, and **audit tracking**, it ensures both ease of use and compliance with banking standards.

