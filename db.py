import psycopg2
from os import environ 

def get_db_param():
    url = "".split('//')[1]
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

conn, curs = connect_to_db()
curs.execute("Select * from readings order by time_val desc;")
rows = curs.fetchall()
disconnect(conn,curs)
print(rows[0])