import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['DEBUG'] = True

@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'no file'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'no file name'}), 400
        if file:
            filename = file.filename;
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return jsonify({'success': 'file uploaded'}), 200
        else:
            return jsonify({'error': 'file not allowed'}), 400  
        
    
if __name__ == '__main__':
    app.run(debug=False)