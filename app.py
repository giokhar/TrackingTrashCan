import bottle
from bottle import response, static_file
from database import *
from datetime import datetime
import bcrypt
import os
import json
from bson import json_util

from sys import argv
HOST = "127.0.0.1"
PORT = 5000


def authenticate(username, password):
  if username == "foo" and password == "abc.123":
    return True
  else:
    return False

@bottle.route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='static/')

@bottle.route("/", method="GET")
def index():
  return bottle.template("index.html")

@bottle.route("/data", method="GET")
def data():
  response.headers['Content-Type'] = 'application/json'
  response.headers['Cache-Control'] = 'no-cache'
  return json.dumps(dataset(), default=json_util.default)

@bottle.route("/current", method="GET")
def data():
  response.headers['Content-Type'] = 'application/json'
  response.headers['Cache-Control'] = 'no-cache'
  return json.dumps(current(), default=json_util.default)

# @bottle.route("/data", method="POST")
# @bottle.auth_basic(authenticate)
# def data():
#   username, password = bottle.request.auth
#   data_value = bottle.request.json

#   conn, cursor = connect_to_db()
#   cursor.execute("Insert into readings values(%d, '%s')" % (data_value["Data"], datetime.now()))
#   conn.commit()
#   disconnect(conn,cursor)
#   print("ADDED", data_value["Data"])
#   bottle.response.status = 200
#   return {"ADDED": data_value["Data"]}

# Run the WebApp
bottle.run(host=HOST, port=PORT)