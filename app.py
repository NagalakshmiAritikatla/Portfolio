from flask import Flask, render_template, request, jsonify

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



app = Flask(__name__)

# Email Configuration - Define these directly since we're not using environment variables
SENDER_EMAIL = "aritikatlanagalakshmi@gmail.com"
SENDER_PASSWORD = "bbmg ouvh rgvv hypc"

@app.route('/')
def home():
    return render_template('template.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/education')
def education():
    return render_template('education.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject', 'Contact Form Submission')
        message = request.form.get('message')

        if not all([name, email, message]):
            return jsonify({
                "status": "error",
                "message": "Please fill in all required fields."
            })

        # Create message
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = SENDER_EMAIL  # Send to yourself
        msg['Subject'] = f"Portfolio Contact: {subject}"

        # Email body
        body = f"""
        New message from your portfolio website:
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        Message: {message}
        """

        msg.attach(MIMEText(body, 'plain'))

        # Send email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)

        return jsonify({
            "status": "success",
            "message": "✨ Thank you for your message! I'll get back to you soon! ✨"
        })
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Failed to send message. Please try again later."
        })

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv('PORT', 5000))