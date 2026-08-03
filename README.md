# PokéPark API Monitor

## 1. Install

```bash
npm install
```

## 2. Configure Gmail

Copy the example environment file:

```bash
cp .env.example .env
```

Fill in:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
NOTIFICATION_EMAIL=your-email@gmail.com
```

`GMAIL_APP_PASSWORD` is a Google App Password, not your regular Gmail password.

## 3. Choose dates

Edit the `dates` array in `src/config.js`.

## 4. Run

```bash
npm start
```
