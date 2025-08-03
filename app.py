from flask import Flask, render_template, request, flash, redirect, url_for
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your-secret-key-change-this-in-production')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/portfolio')
def portfolio():
    # Sample portfolio data - replace with your actual services/projects
    portfolio_items = [
        {
            'id': 1,
            'title': 'E-Commerce Platform',
            'description': 'Modern online shopping solution with AI recommendations',
            'image': 'portfolio1.jpg',
            'demo_url': 'https://demo1.example.com',
            'technologies': ['React', 'Node.js', 'MongoDB', 'AI/ML']
        },
        {
            'id': 2,
            'title': 'Analytics Dashboard',
            'description': 'Real-time business intelligence and data visualization',
            'image': 'portfolio2.jpg',
            'demo_url': 'https://demo2.example.com',
            'technologies': ['Python', 'D3.js', 'PostgreSQL', 'Docker']
        },
        {
            'id': 3,
            'title': 'CRM System',
            'description': 'Customer relationship management with automation',
            'image': 'portfolio3.jpg',
            'demo_url': 'https://demo3.example.com',
            'technologies': ['Vue.js', 'Laravel', 'MySQL', 'AWS']
        }
    ]
    return render_template('portfolio.html', portfolio_items=portfolio_items)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        company = request.form.get('company')
        message = request.form.get('message')
        
        # Here you would normally send email or save to database
        # For now, just flash a success message
        flash('Thank you for your message! We will get back to you soon.', 'success')
        return redirect(url_for('contact'))
    
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)