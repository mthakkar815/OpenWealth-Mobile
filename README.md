# OpenWealth - Mobile Version

OpenWealth is a decentralized finance (DeFi) platform For Mobile

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)

---

## Tech Stack

### Core Technologies

- **React Native**
- **Expo**
- **TypeScript**
- **Redux**
  
### API & Data Handling

- **Axios**
- **Coingecko API**

### Developer Tools

- **ESLint**
- **Prettier**

### UI & Icons

- **react-native-paper**
- **react-native-vector-icons**

---

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/mthakkar815/openwealth-mobile.git
   cd openwealth-mobile

2. Install dependencies:
    
    ```bash
    npm install
    
2. Install Expo CLI globally (if you don’t have it installed)
    
    ```bash
    npm install -g expo-cli

## Environment Variables

1. Create the .env file with environment variables:
    ```bash
    touch .env
    
2. Add the following content to the .env file:
    
    ```bash
    API_BASE_URL=https://api.coingecko.com/api/v3

The project uses environment variables to manage API URLs and other sensitive information. Make sure to define the required variables in the .env file.

## Running the Project

After completing the installation and setting up the environment variables, you can start the project locally.

1.	Start the Expo development server:
    
    ```bash
    npx expo start

2.	Once the Expo server is running, open the Expo Go app on your mobile device and scan the QR code to view the app on your phone.
Alternatively, you can run the app on an iOS or Android emulator.

## Available Scripts

	• npx expo start --ios
	• npx expo start --android