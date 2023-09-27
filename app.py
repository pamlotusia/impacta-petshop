from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/teste')
def test():
    return render_template('teste.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/signup')
def signup():
    return render_template('signup.html')


# colocar o site no ar
if __name__ == '__main__':
    app.run(debug=True)
