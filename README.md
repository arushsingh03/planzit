<div align="center">
      <h1> <img src="https://cdn-icons-png.flaticon.com/128/14468/14468225.png" width="80px"><br/>PlanzIt</h1>
     </div>
<p align="center"> <a href="https://planzit.vercel.app" target="_blank"><img alt="" src="https://img.shields.io/badge/Website-EA4C89?style=normal&logo=dribbble&logoColor=white" style="vertical-align:center" /></a> <a href="https://x.com/arush_singh03" target="_blank"><img alt="" src="https://img.shields.io/badge/Twitter-1DA1F2?style=normal&logo=twitter&logoColor=white" style="vertical-align:center" /></a> <a href="https://www.instagram.com/arushsingh03/" target="_blank"><img alt="" src="https://img.shields.io/badge/Instagram-E4405F?style=normal&logo=instagram&logoColor=white" style="vertical-align:center" /></a> <a href="https://www.linkedin.com/in/arushsingh03/}" target="_blank"><img alt="" src="https://img.shields.io/badge/LinkedIn-0077B5?style=normal&logo=linkedin&logoColor=white" style="vertical-align:center" /></a> </p>

# Description
Planzit is a calendar scheduling platform built with Next.js, styled using Tailwind CSS and shadcn-ui components. It leverages Supabase for database management, Nylas for scheduling and storage, and integrates Google Cloud and GitHub for authentication. Designed to streamline personal and collaborative planning, Planzit offers a seamless, intuitive experience—all implemented using free tools and services.

# Features
### Quick Signup & Profile Setup:

- Get started in minutes with a simple sign-up process.
- Personalize your profile with relevant details to help others connect with you easily.
### Seamless Calendar Management:

- Manage meetings and events within Planzit.
- Google Calendar Sync: Keep everything synced across platforms to avoid missed meetings and double bookings.

### Effortless Meeting Scheduling:

- Easily schedule meetings by sharing your availability with others.
- Send invites, track RSVPs, and manage attendee status directly from Planzit.

### Real-Time Availability Tracking:

- Quickly check your availability and avoid conflicts with live updates.
- Integrated notifications to remind you of upcoming meetings or last-minute changes.

### Join Meetings in One Tap:

- Access meeting links and join calls with a single tap from your dashboard.
- Stay on top of all your events without juggling multiple apps.

### Intuitive User Experience:

- Clean, responsive design for smooth navigation across all devices.
- Tailored for both personal and professional use, catering to freelancers, businesses, and individuals.

### Centralized Control for All Plans:

- View and manage all meetings, tasks, and events from a single interface.
- Flexible scheduling tools to organize your day with ease.

### _**With Planzit, everything you need to manage your time effectively is at your fingertips—whether you’re scheduling a business meeting, setting personal goals, or coordinating events. Simplify your planning, save time, and never miss an important moment!**_


# Screenshots
#### Hero 
 <img src="https://i.imgur.com/78XCEsb.png"><br/>
 #### DashBoard/You Events 
 > You can Add, Edit, Delete or Preview and Manage Your Events Will full Accessibility
 <img src="https://i.imgur.com/1iloYgY.png"><br/>
 #### Your Active Session  
 > You can join you meet from here
 <img src="https://i.imgur.com/oPFGxdl.png"><br/>
 #### Availability 
 > You can Manage You Slots
 <img src="https://i.imgur.com/xgR34Ao.png"><br/>
 #### User Setting 
 > You can edit you details, change chnage your Name, profile 
 <img src="https://i.imgur.com/gHsEyxF.png"><br/>
 
# Tech Used
 ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 	![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
      
### Here’s a Local Setup Guide for your Planzit GitHub repository in:

# Planzit – Local Setup Guide

Follow these steps to set up the Planzit project locally.

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v18.x or higher)  
- **npm** or **yarn** (for package management)  
- **Git**  
- **PostgreSQL** (if required for database setup)  
- **Nylas Developer Account** (for Nylas API integration)

## 1. Clone the Repository
Open your terminal and run:
`git clone https://github.com/arushsingh03/planzit.git
cd planzit`
## 2. Install Dependencies
#### Using npm
`npm install`

#### Or using yarn
`yarn install`

## 3. Create a .env File

| **Environment Variable**      | **Description**                                                 |
|-------------------------------|-----------------------------------------------------------------|
| `AUTH_SECRET`                 | Secret key used to sign and verify authentication tokens.      |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | GitHub OAuth credentials for enabling GitHub login.   |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth credentials for Google login integration. |
| `DATABASE_URL`                | Connection string for accessing the primary database.          |
| `DIRECT_URL`                  | Direct access URL for specific database operations or APIs.    |
| `NYLAS_API_SECRET_KEY` / `NYLAS_API_URI` / `NYLAS_CLIENT_ID` | Nylas API credentials for email, calendar, or communication sync. |
| `NEXT_PUBLIC_URL`             | Public URL for the app, used for client-side requests.          |
| `UPLOADTHING_TOKEN`           | Token for managing file uploads through UploadThing service.   |

## 4. Run the Database (Optional)
If you are using PostgreSQL, make sure the database is running. You can set up the schema by running:
`npx prisma migrate dev`

## 5. Start the Development Server
Run the following command to start the development server:

####  Using npm
`npm run dev`

#### Or using yarn
`yarn dev`

## The application will be available at:
`http://localhost:3000`

## 6. Verify OAuth Setup
Ensure that your GitHub and Google OAuth integrations are correctly configured by testing the login flows. You may need to whitelist http://localhost:3000 in the OAuth provider's settings.

## 7. Sync with Nylas API (Optional)
Make sure you have set up your Nylas credentials and configured the API access properly. Verify that the Nylas sync works for scheduling features.

# Linting and Formatting (Optional)
Run the following commands to ensure code quality:

## 8. Lint the code
`npm run lint`

## 9.  Format the code
`npm run format`
## 10. Build the Application (Optional)
To create a production build:

`npm run build`

## 11. Contributing (Optional)
If you plan to contribute, create a new branch:

git checkout -b your-feature-branch
After making changes, push your branch and open a pull request.

## Troubleshooting
Port Conflict: If 3000 is in use, update NEXT_PUBLIC_URL in the .env and run the server on a different port:
`PORT=4000/5000 npm run dev`
Database Issues: Make sure your DATABASE_URL is correct and PostgreSQL is running.
# `Happy coding with ARUSH! ⚙️`

### Click this spaces shuttle to blast off to Planzit! 🚀 Don't worry, it’s not a one-way trip!
<a href="https://planzit.vercel.app/" target="_blank">
    <img src="https://www.animatedimages.org/data/media/99/animated-mini-gif-image-1555.gif" alt="Animated Image" style="margin-left: 10px; width: 50px; height: 20px;">
</a>

  


<!-- </> with 💛 by readMD (https://readmd.itsvg.in) -->

    






<!-- </> with 💛 by readMD (https://readmd.itsvg.in) -->
    
