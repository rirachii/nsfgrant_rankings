import sqlite3
from sqlite3 import Error


class Database:
    def __init__(self, year):
        """create a table from the create_table_sql statement
        :param year: String ex. _2019
        :return:
        """
        self.year = year
        self.conn = None
        try:
            self.conn = sqlite3.connect("nsf_grant_data.db")
            self.c = self.conn.cursor()
            table_template = (
                """CREATE TABLE IF NOT EXISTS """
                + self.year
                + """ (
                        id integer PRIMARY KEY,
                        abr text NOT NULL,
                        amt,
                        faculty,
                        institution_name text NOT NULL,
                        start_year text NOT NULL,
                        awardID text NOT NULL
                    );"""
            )
            try:
                self.c.execute(table_template)
                self.c.execute(
                    "CREATE TABLE IF NOT EXISTS institution ( id integer PRIMARY KEY, institution_name);"
                )
            except Error as e:
                print(e)
        except Error as e:
            print(e)


    def db_append(self, data):
        """
        Create a new task
        :param data: Tuple
        :return:
        """
        sql = (
            """INSERT INTO """
            + self.year
            + """ (abr, amt, faculty, 
        institution_name, start_year, awardID) VALUES(?,?,?,?,?,?) """
        )
        self.c.execute(sql, data)

    def db_append_int(self, data):
        sql = (
            """INSERT INTO """
            + self.year
            + """ (abr, amt, faculty, 
        institution_name, start_year, awardID) VALUES(?,?,?,?,?,?) """
        )
        self.c.execute(sql, data)



class Json_Database:
    def __init__(self):
        """create a table from the create_table_sql statement
        :param year: String ex. _2019
        :return:
        """
        self.conn = None
        try:
            self.conn = sqlite3.connect("json_2000_2022.db")
            self.c = self.conn.cursor()
            
        except Error as e:
            print(e)