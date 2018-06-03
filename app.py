from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from fhirclient import client
import fhirclient.models.patient as p
import urllib.request
import json

app = Flask(__name__)
CORS(app)
settings = {
    'app_id': 'my_web_app',
    'api_base': 'http://localhost:8080/baseDstu3'
}
smart = client.FHIRClient(settings=settings)

DEF_COUNT = 20


@app.route('/')
def hello_world():
    return redirect("list")


if __name__ == '__main__':
    app.run()


@app.route('/list/<page>')
@app.route('/list/', defaults={'page': 0})
def get_patients_page(page):
    filt = request.args.get('surname', default='', type=str)
    ask = {
        '_count': str(DEF_COUNT),
        '_getpagesoffset': str(int(page)*int(DEF_COUNT)),
        'family': filt
    }
    total = get_total(filt)
    result = []

    if ((total-1)//20) < int(page) or int(page)<0:
        return redirect("list")
    i = 0
    for patient in p.Patient.where(ask).perform_resources(smart.server):
        result.append({'name': smart.human_name(patient.name[0]),
                       'id': patient.id})
        i += 1
    return jsonify({'pagecount': str(((total-1)//20)+1), 'patients': result})


@app.route('/patient/<pid>')
def get_patient_info(pid):
    try:
        total = int(get_total_patient(pid))
        with urllib.request.urlopen(settings['api_base'] +
                                    '/Patient/'+pid+'/$everything?_format=json' +
                                    '&_count=' + str(total)) as url:
            data = json.loads(url.read().decode())
            return jsonify(data['entry'])
    except:
        return redirect("list")

@app.errorhandler(500)
def internal_error(error):
    return "500 error"


@app.errorhandler(404)
def internal_error(error):
    return "404 error"


@app.errorhandler(403)
def internal_error(error):
    return "403 error"


def get_total(filt):
    try:
        with urllib.request.urlopen(settings['api_base'] +
                                    '/Patient?_format=json&_sumarry=count&family=' + str(filt)) as url:
            data = json.loads(url.read().decode())
            total = data['total']
            return total
    except:
        return 0

def get_total_patient(pid):
    try:
        with urllib.request.urlopen(settings['api_base'] +
                                    '/Patient/' + pid +
                                    '/$everything?_format=json&_sumarry=count') as url:
            data = json.loads(url.read().decode())
            total = data['total']
            return total
    except:
        return 0