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
    # AI Safety Solutions data
    solution_items = [
        {
            'id': 1,
            'title': 'Temperature Monitoring AI',
            'description': 'Advanced thermal analysis system with predictive overheating detection for chemical processing facilities',
            'category': 'anomaly monitoring',
            'demo_url': 'https://temp-monitor.nextbrg.com',
            'technologies': ['LSTM Networks', 'Edge AI', 'IoT Sensors', 'TensorRT'],
            'accuracy': '99.4%',
            'response_time': '150ms'
        },
        {
            'id': 2,
            'title': 'Pressure Anomaly Detection',
            'description': 'Real-time pressure monitoring with AI-powered leak detection and burst prediction for pipeline systems',
            'category': 'anomaly predictive',
            'demo_url': 'https://pressure-ai.nextbrg.com',
            'technologies': ['Transformer Models', 'Edge Computing', 'SCADA Integration'],
            'accuracy': '98.7%',
            'response_time': '75ms'
        },
        {
            'id': 3,
            'title': 'Multi-Sensor Integration Platform',
            'description': 'Universal IoT platform connecting 500+ sensor types with unified AI analytics and automated response systems',
            'category': 'integration monitoring',
            'demo_url': 'https://multi-sensor.nextbrg.com',
            'technologies': ['Federated Learning', 'MQTT', 'OPC-UA', 'Kubernetes'],
            'accuracy': '97.2%',
            'response_time': '200ms'
        }
    ]
    return render_template('portfolio.html', solution_items=solution_items)

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