# usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, jsonify
from cube64_2 import *
from flask_cors import CORS, cross_origin
from flask import request
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cube_chaine = [3,1,2,1,1,3,1,2,1,2,1,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,3,1,1,1,3,1,2,1,1,1,1,1,1,1,1,1,3,1]
cube = cube64(cube_chaine)
coord_cube = cube.get_coordonnees()

@app.route('/etat_cube', methods=['GET'])
@cross_origin()
def get_etat_cube():
    reponse = jsonify({"coordonnees": [[int(c) for c in coord] for coord in coord_cube]})
    # reponse.headers["Access-Control-Allow-Origin"] = "*"
    # reponse.headers["Access-Control-Allow-Credentials"] = True
    return reponse

@app.route('/rotate_cube', methods=['POST'])
@cross_origin()
def rotate_cube():
    donnees = request.data
    donnees_chaine = donnees.decode('utf-8')
    donnees_json = json.loads(donnees_chaine)
    numcube = donnees_json["position_cube"]
    cube.set_noeud_for_cubatome(numcube)
    coord_cube = cube.get_coordonnees()
    return jsonify({"coordonnees": [[int(c) for c in coord] for coord in coord_cube]})

@app.route('/')
def index():
    routes = []
    for rule in app.url_map.iter_rules():
        if rule.endpoint != 'static':
            routes.append((rule.rule, rule.endpoint))
    return '<br>'.join([f'<a href="{route}">{route}</a>' for route, endpoint in routes])


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
