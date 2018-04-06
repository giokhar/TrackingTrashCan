import psycopg2
from os import environ 

def get_my_key(filename):
    with open(filename) as f:
        return f.read()

def get_db_param():
    url = get_my_key("key.txt").split('//')[1]
    auth, conn = url.split("@")
    username, password = auth.split(":")
    socket, database = conn.split("/")
    host, port = socket.split(":")
    return (database, username, password, host, port)

def connect_to_db():
    db_name, db_username, db_passw, db_host, db_port = get_db_param()
    try:
        conn = psycopg2.connect(dbname=db_name, user=db_username, password=db_passw, host=db_host, port=db_port)
        cursor = conn.cursor()
        return (conn, cursor)
    except:
        print("Failed to connect to database")
        exit()

def disconnect(conn, cursor):
    cursor.close()
    conn.close()

def dataset():
    conn, curs = connect_to_db()
    curs.execute("Select * from readings order by id desc;")
    rows = curs.fetchall()
    disconnect(conn,curs)
    return rows

def current():
    return dataset()[0]

def custom_query():
    conn, curs = connect_to_db()
    curs.execute("Select count(data) from readings;")
    rows = curs.fetchall()
    disconnect(conn,curs)
    return rows
def format_date(date):
    return (str(date.year) + "/" + str(date.month).zfill(2) + "/" + str(date.day).zfill(2) + " " + str(date.hour).zfill(2) + ":" + str(date.minute).zfill(2) + ":" + str(date.second).zfill(2))
