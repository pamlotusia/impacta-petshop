from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def homepage():
    return render_template('principal.html')


@app.route('/servicos')
def services():
    return render_template('choose-service.html')


# colocar o site no ar
if __name__ == '__main__':
    app.run(debug=True)
