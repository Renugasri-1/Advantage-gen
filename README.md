Project Title: Automated Social Media Campaign Studio 🚀
Product Brand Name: "AdVantage Gen" 

AI Campaign studio is a full-stack application that automatically creates marketing campaigns using AI.
It enhances prompts, generates images, adds branding, creates marketing copy, stores campaigns in a database, and allows remixing existing campaigns.
This project demonstrates backend scaling concepts including AI integration, image processing, cloud storage, and database persistence.

Features ✨
AI Prompt Enhancement
Enhances user prompts using an AI model before generating campaigns.
AI Image Generation
Generates marketing images based on enhanced prompts.
Automated Branding
Adds a logo watermark to generated images using Sharp.
Marketing Copy Generation
Creates promotional text for the campaign using AI.
Cloud Image Storage
Uploads generated images to Cloudinary.
Campaign Persistence
Stores campaigns in a database using MongoDB and Mongoose.
Remix Campaigns
Users can remix existing campaigns with a creative variation.
Rate Limit Handling
Handles API rate limits gracefully for AI services.

Tech Stack 🛠
Backend
Node.js
Express.js

Database
MongoDB
Mongoose

AI Services
AI Prompt Enhancement
AI Copy Generation
AI Image Generation

Image Processing
Sharp

Cloud Storage
Cloudinary

Frontend
React (studio UI)

Project Structure 📂


advantage-gen
│
├── assets
│   └── logo.png
│
├── models
│   └── Campaign.js
│
├── routes
│   └── generate.js
│
├── services
│   ├── brandingService.js
│   ├── cloudinaryService.js
│   ├── imageService.js
│   ├── promptService.js
│   └── copyService.js
│
├── utils
│   └── handleRateLimit.js
│
├── studio-ui
│   └── React frontend
│
├── outputs
│   └── generated images (ignored in git)
│
├── server.js
├── package.json
└── README.md

Installation ⚙️
Clone the repository:
Copy code

git clone https://github.com/your-username/advantage-gen.git
Navigate to the project:
Copy code

cd advantage-gen
Install dependencies:
Copy code

npm install
Environment Variables 🔐
Create a .env file in the root directory.
Example:
Copy code

PORT=5000
MONGODB_URI=your_mongodb_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
AI_API_KEY=your_ai_api_key

## Live Demo
Frontend: https://advantage-gen-chi.vercel.app/

## Backend API
https://advantage-gen.onrender.com

POST /api/generate
Generates a new AI campaign.
Remix Campaign
Copy code

POST /api/remix/:id
Creates a new variation of an existing campaign.
Get Campaign History
Copy code

GET /api/campaigns
Fetches all previously generated campaigns.
Example Response
Copy code

{
  "status": "success",
  "imageUrl": "cloudinary-image-url",
  "copy": "AI generated marketing text",
  "campaignId": "mongodb-id"
}

Proof of Implementation 📸
The repository includes proof screenshots for each development week:
Week 1 – Basic campaign generation
Week 2 – Prompt enhancement
Week 3 – Image branding
Week 4 – Remix campaigns, Cloudinary storage, MongoDB persistence
