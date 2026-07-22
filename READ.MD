# Perfume Discovery & Review Platform

Perfume is a full-stack web application for discovering fragrances, exploring
product details, and sharing reviews. It was created as a team project to model
the core workflows of a community-driven product catalog: account management,
fragrance browsing, tagging, ratings, and user-generated feedback.

> This repository is an academic prototype built in 2019. The project is no
> longer actively maintained, and some integrations and dependencies may require
> updates before the application can run on a current environment.

## Features

- Browse fragrance products and view detailed product and brand information
- Organize and discover perfumes through categories and community tags
- Create an account and maintain an authenticated user session
- Submit ratings and written reviews
- View and manage reviews from a user profile
- Track likes, dislikes, and reports on community content
- Link to external product pages and share products on social platforms

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Rendering:** Handlebars
- **Authentication:** Express Session, bcrypt
- **Frontend:** JavaScript, HTML, CSS, Bootstrap

## Architecture

The application follows a layered server-side architecture:

```text
Browser
  -> Express routes
      -> data-access modules
          -> MongoDB collections
  <- Handlebars views
```

- `routes/` handles HTTP requests, validation, and response rendering.
- `data/` contains persistence logic for users, perfumes, and comments.
- `views/` contains reusable layouts and page templates.
- `config/` manages the MongoDB connection and Handlebars helpers.
- `public/` contains browser-side scripts, styles, and static assets.

The data model separates perfume, user, and comment records while storing
references between them. This supports user profiles, product-level reviews,
ratings, and moderation signals without embedding all community activity in a
single document.

## Local Development

### Prerequisites

- Node.js and npm
- MongoDB running locally on port `27017`

### Run the application

```bash
git clone https://github.com/xuan-62/Perfume.git
cd Perfume
npm install
node app.js
```

Then open [http://localhost:3000](http://localhost:3000).

The default database configuration is stored in `config/settings.json` and uses
the `PerfumeDB` database on a local MongoDB instance.

## Project Status

This repository preserves an early full-stack team project and is not a
production deployment. Known modernization work includes upgrading legacy npm
dependencies, consolidating the completed feature branches, replacing expired
external assets, and adding automated tests.

## License

MIT