from flask import Flask, render_template, request, redirect, url_for, send_file
import sqlite3
import csv
from io import StringIO
from datetime import datetime

app = Flask(__name__)
DB = 'database.db'

# Initialize database
conn = sqlite3.connect(DB)
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prof_ausente TEXT,
    asig_ausente TEXT,
    dia_ausente TEXT,
    bloques_ausente TEXT,
    prof_reemplazo TEXT,
    asig_reemplazo TEXT,
    dia_reemplazo TEXT,
    bloques_reemplazo TEXT,
    estado TEXT,
    fecha_registro TEXT
)''')
conn.commit()
conn.close()


def guardar_registro(data):
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute('''INSERT INTO registros (
        prof_ausente, asig_ausente, dia_ausente, bloques_ausente,
        prof_reemplazo, asig_reemplazo, dia_reemplazo, bloques_reemplazo,
        estado, fecha_registro) VALUES (?,?,?,?,?,?,?,?,?,?)''', data)
    conn.commit()
    conn.close()


def obtener_registros(mes=None, ano=None):
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    query = 'SELECT * FROM registros'
    params = []
    if mes and ano:
        query += ' WHERE strftime("%m", fecha_registro)=? AND strftime("%Y", fecha_registro)=?'
        params = [f"{int(mes):02d}", str(ano)]
    elif ano:
        query += ' WHERE strftime("%Y", fecha_registro)=?'
        params = [str(ano)]
    c.execute(query, params)
    rows = c.fetchall()
    conn.close()
    return rows

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        prof_ausente = request.form['prof_ausente']
        asig_ausente = request.form['asig_ausente']
        dia_ausente = request.form['dia_ausente']
        bloques_ausente = ','.join(request.form.getlist('bloques_ausente'))

        prof_reemplazo = request.form['prof_reemplazo']
        asig_reemplazo = request.form['asig_reemplazo']
        dia_reemplazo = request.form['dia_reemplazo']
        bloques_reemplazo = ','.join(request.form.getlist('bloques_reemplazo'))

        estado = 'hora realizada' if asig_ausente == asig_reemplazo else 'hora cubierta, pero no realizada'
        fecha_registro = datetime.now().isoformat()

        guardar_registro((prof_ausente, asig_ausente, dia_ausente, bloques_ausente,
                          prof_reemplazo, asig_reemplazo, dia_reemplazo, bloques_reemplazo,
                          estado, fecha_registro))
        return redirect(url_for('index'))
    return render_template('index.html')

@app.route('/historial')
def historial():
    mes = request.args.get('mes')
    ano = request.args.get('ano')
    registros = obtener_registros(mes, ano)
    return render_template('history.html', registros=registros)

@app.route('/exportar')
def exportar():
    mes = request.args.get('mes')
    ano = request.args.get('ano')
    registros = obtener_registros(mes, ano)
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(['Prof. Ausente', 'Asignatura Ausente', 'Día Ausente', 'Bloques Ausente',
                     'Prof. Reemplazo', 'Asignatura Reemplazo', 'Día Reemplazo',
                     'Bloques Reemplazo', 'Estado', 'Fecha Registro'])
    for row in registros:
        writer.writerow(row[1:])
    output.seek(0)
    filename = f"reporte_{mes or 'all'}_{ano or 'all'}.csv"
    return send_file(StringIO(output.read()), mimetype='text/csv', as_attachment=True, download_name=filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
