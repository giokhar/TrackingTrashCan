import bottle
from bottle import response, static_file
from database import *
from datetime import datetime, timezone
import os
import json
from pytz import timezone

from sys import argv

HOST = "127.0.0.1"
PORT = argv[1]

def authenticate(username, password):
  if username == "foo" and password == "abcd.123":
    return True
  else:
    return False

@bottle.route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='static/')

@bottle.route("/", method="GET")
def index():
  return bottle.template("index.html")

@bottle.route("/api/data", method="GET")
def api_data():
  response.headers['Content-Type'] = 'application/json'
  response.headers['Cache-Control'] = 'no-cache'
  return json.dumps(dataset())

@bottle.route("/api/current", method="GET")
def api_current():
  response.headers['Content-Type'] = 'application/json'
  response.headers['Cache-Control'] = 'no-cache'
  return json.dumps(current())

@bottle.route("/data", method="POST")
@bottle.auth_basic(authenticate)
def data():
  username, password = bottle.request.auth
  data_value = bottle.request.json

  conn, cursor = connect_to_db()
  cursor.execute("Insert into readings values(%d, '%s')" % (data_value["Data"], format_date(datetime.now(timezone('US/Eastern')))))
  conn.commit()
  disconnect(conn,cursor)
  print("ADDED", data_value["Data"])
  bottle.response.status = 200
  return {"ADDED": data_value["Data"]}

# Run the WebApp
bottle.run(host=HOST, port=PORT)

