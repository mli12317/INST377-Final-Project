Developer Manual

How to Install the Application
1. Clone the Repository
git clone:  https://github.com/mli12317/INST377-Final-Project.git
Then open the project folder in VS Code.

2. Install Backend Dependencies
Open a terminal in the backend folder:
cd backend
npm install

Packages used:
express
cors
dotenv
axios
@supabase/supabase-js


3. Create the .env File
Inside the backend folder create a file named:
.env

Add:
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000

These values come from the Supabase project settings.

4. Create the Favorites Table in Supabase
Inside Supabase create a table called:
favorites

Columns:
Column Name
Type
id
int8
artwork_id
int8
title
text
artist
text
image_url
text

Settings:
Set id as Primary Key
Turn on Auto Increment for id
Disable Row Level Security for testing.

How to Run the Backend Server:

Inside the backend folder run
node index.js

If successful you should see:
Server running on port 3000


How to Run the Frontend:

Open the frontend folder.
Run the HTML files using Live Server in VS Code.
Main page:
home_page.html
API Endpoints
GET /api/artworks/search?q=
Searches artwork from the Art Institute of Chicago API.
Example:
http://localhost:3000/api/artworks/search?q=monet

GET /api/favorites
Returns all favorite artworks stored in Supabase.
Example:
http://localhost:3000/api/favorites

POST /api/favorites
Adds a favorite artwork into Supabase.
Example Body:
{
  "artwork_id": 123,
  "title": "Starry Night",
  "artist": "Van Gogh",
  "image_url": "test.jpg"
}

How to Test the API
You can test API using:
Browser
Postman
Insomnia
PowerShell
Example:
curl http://localhost:3000/api/favorites

Frontend Requirements Completed:
Uses Fetch API
Uses backend API routes
Multiple pages
Styled with CSS
Uses JavaScript
Uses external API
Uses Supabase database

Libraries used:
Express.js
Supabase JavaScript Client


Deployment
The project is intended to be deployed using:
Vercel for frontend and backend
Supabase for database hosting

Known Bugs:
Some artwork entries may not contain images
Artist filters may take longer to load
Mobile responsiveness is limited

Future Improvements:
Add user authentication
Add pagination
Add artwork detail pages
Improve mobile responsiveness
Add dark mode
Add charts/statistics for artwork categories


Project Structure:

INST377-Final-Project:
Frontend:
home_page.html
about_page.html
help_page.html
style.css
app.js

Backend:
index.js
artworks.js
favorites.js
supabase.js
 package.json
.env

Docs:
developer_manual.md

Authors:
Sara Susa
Megan 
Created for INST377 Final Project.
