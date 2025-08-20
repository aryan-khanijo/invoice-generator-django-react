# Backend Setup Instructions

## Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

## Setup

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the backend directory with:
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   DATABASE_URL=sqlite:///db.sqlite3
   ```

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

The backend API will be available at `http://127.0.0.1:8000/`

## Project Structure
```
backend/
├── manage.py
├── requirements.txt
├── README.md
└── invoice_project/  # (will be created when Django project is initialized)
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```
