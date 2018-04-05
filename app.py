import bottle
from database import *
from datetime import datetime
import bcrypt
import os

from sys import argv
HOST = "0.0.0.0"
PORT = argv[1]


def authenticate(username, password):
  if username == "foo" and password == "abc.123":
    return True
  else:
    return False

@bottle.route("/", method="GET")
def index():
  return bottle.template("index.html")


@bottle.route("/data", method="POST")
@bottle.auth_basic(authenticate)
def data():
  username, password = bottle.request.auth
  data_value = bottle.request.json

  conn, cursor = connect_to_db()
  cursor.execute("Insert into readings values(%d, '%s')" % (data_value["Data"], datetime.now()))
  conn.commit()
  disconnect(conn,cursor)
  print("ADDED", data_value["Data"])
  bottle.response.status = 200
  return {"ADDED": data_value["Data"]}

# Run the WebApp
bottle.run(host=HOST, port=PORT)

