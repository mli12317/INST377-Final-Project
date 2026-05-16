# Developer Manual

## 1. Clone the Repository

Clone the GitHub repository onto your local machine:

```bash
git clone https://github.com/mli12317/INST377-Final-Project.git
```

After cloning, open the project folder in VS Code.

---

## 2. Install Backend Dependencies

Open a terminal inside the backend folder:

```bash
cd backend
npm install
```

This installs all required backend packages.

### Packages Used

- express
- cors
- dotenv
- axios
- @supabase/supabase-js

---

## 3. Create the Environment Variables File

Inside the backend folder, create a file named:

```text
.env
```

Add the following variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

These can be found in the Supabase api project settings.

---

## 4. Create the Favorites Table in Supabase

Inside Supabase, create a table named:

```text
favorites
```

Use the following columns:

| Column Name | Type |
|---|---|
| id | int8 |
| artwork_id | int8 |
| title | text |
| artist | text |
| image_url | text |

### Table Settings

- Set `id` as the Primary Key
- Enable Auto Increment for `id`
- Disable Row Level Security (RLS) for testing

---

## 5. Run the Backend Server

Inside the backend folder, run:

```bash
node index.js
```

If successful, the terminal should display:

```bash
Server running on port 3000
```

---

## 6. Run the Frontend

Open the frontend folder in VS Code.

Use the Live Server extension to run:

```text
home_page.html
```

---

## 7. API Endpoints

### GET /api/artworks/search?q=

Searches artwork using the Art Institute of Chicago API.

#### Example

```text
http://localhost:3000/api/artworks/search?q=monet
```

---

### GET /api/favorites

Returns all favorite artworks stored in Supabase.

#### Example

```text
http://localhost:3000/api/favorites
```

---

### POST /api/favorites

Adds a favorite artwork to the Supabase database.

#### Example Request Body

```json
{
  "artwork_id": 123,
  "title": "Starry Night",
  "artist": "Van Gogh",
  "image_url": "test.jpg"
}
```

---

## 8. Testing the APIs

The APIs can be tested using:

- Browser
- Insomnia
- PowerShell

### Example

```bash
curl http://localhost:3000/api/favorites
```

---

## 9. Frontend Requirements Completed

- Uses Fetch API
- Uses backend API routes
- Multiple application pages
- Styled with CSS
- Uses JavaScript
- Uses an external API
- Uses a Supabase database

### Libraries Used

- Express.js
- Supabase JavaScript Client

---

## 10. Deployment

The application is intended to be deployed using:

- Vercel for frontend and backend hosting
- Supabase for database hosting

---

## 11. Known Bugs

- Some artwork entries may not contain images
- Artist filters may load slowly
- Mobile responsiveness is still limited

---

## 12. Future Improvements

- Add user authentication
- Add pagination
- Add individual artwork detail pages
- Improve mobile responsiveness
- Add dark mode
- Add charts and statistics for artwork categories

---

## 13. Project Structure

```text
INST377-Final-Project

frontend:
home_page.html
about_page.html
help_page.html
style.css
app.js

backend:
index.js
artworks.js
favorites.js
supabase.js
package.json
.env

docs
developer_manual.md

README.md
```

---

# Authors
Sara Susa
Megan Li

