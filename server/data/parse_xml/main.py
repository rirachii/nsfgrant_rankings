import SQLCommands
import os
from xml.etree import ElementTree
import json

code = {
    "division of integrative organismal systems": "IOS",
    "division of undergraduate education": "DUE",
    "division of mathematical sciences": "DMS",
    "division of human resource development": "HRD",
    "division of physics": "PHY",
    "division of behavioral and cognitive sci": "BCS",
    "div of chem, bioeng, env, & transp sys": "CBET",
    "division of environmental biology": "DEB",
    "division of materials research": "DMR",
    "division of ocean sciences": "OCE",
    "div atmospheric & geospace sciences": "AGS",
    "division of computer and network systems": "CNS",
    "div of civil, mechanical, & manufact inn": "CMMI",
    "div of molecular and cellular bioscience": "MCB",
    "division of earth sciences": "EAR",
    "division of research on learning": "DRL",
    "div of biological infrastructure": "DBI",
    "division of graduate education": "DGE",
    "division of experimental & integ activit": "EIA",
    "division of chemistry": "CHE",
    "office of polar programs (opp)": "OPP",
    "division of polar programs": "OPP",
    "div of electrical, commun & cyber sys": "ECCS",
    "division of computing and communication foundations": "CCF",
    "divn of social and economic sciences": "SES",
    "div of information & intelligent systems": "IIS",
    "div of industrial innovation & partnersh": "IIP",
    "office of advanced cyberinfrastructure (oac)": "OAC",
    "sbe off of multidisciplinary activities": "SMA",
    "division of astronomical sciences": "AST",
    "div of engineering education and centers": "EEC",
    "office of internatl science &engineering": "OISE",  # good amount
    "icer": "ICER",  # seems like a small new program
    "emerging frontiers & multidisciplinary activities": "EFMA",  # 22
    "emerging frontiers": "EF",  # 30
    "office of integrative activities": "OIA",  #  39
}

areas = {
    "AGS": "Div Atmospheric & Geospace Sciences",
    "AST": "Division Of Astronomical Sciences",
    "BCS": "Division Of Behavioral and Cognitive Sci",
    "CBET": "Div Of Chem, Bioeng, Env, & Transp Sys",
    "CCF": "Division Of Computing and Communication Foundations",
    "CHE": "Division Of Chemistry",
    "CMMI": "Div Of Civil, Mechanical, & Manufact Inn",
    "CNS": "Division Of Computer and Network Systems",
    "DBI": "Div Of Biological Infrastructure",
    "DEB": "Division Of Environmental Biology",
    "DMR": "Division Of Materials Research",
    "DMS": "Division Of Mathematical Sciences",
    "DRL": "Division Of Research On Learning",
    "DUE": "Division Of Undergraduate Education",
    "EAR": "Division Of Earth Sciences",
    "ECCS": "Div Of Electrical, Commun & Cyber Sys",
    "EEC": "Div Of Engineering Education and Centers",
    "EF": "Emerging Frontiers",
    "EFMA": "Emerging Frontiers & Multidisciplinary Activities",
    "HRD": "Division Of Human Resource Development",
    "ICER": "ICER",
    "IIP": "Industrial Innovation & Partnersh",
    "IIS": "Information & Intelligent Systems",
    "IOS": "Integrative Organismal Systems",
    "MCB": "Molecular and Cellular Bioscience",
    "OAC": "Office of Advanced Cyberinfrastructure (OAC)",
    "OCE": "Division of Ocean Sciences",
    "OIA": "Office of Integrative Activities",
    "OISE": "Office of Internatl Science &Engineering",
    "OPP": "Office of Polar Programs (OPP)",
    "PHY": "Division of Physics",
    "SES": "Divn of Social and Economic Sciences",
    "SMA": "Off of Multidisciplinary Activities",
}


def parse_xml():
    dbase = SQLCommands.Database("_2000_2022")
    for n in range(1998, 1999 + 1, 1):
        str_year = str(n)
        year_num = str_year
        valid_nums = []
        start = str_year[2] + str_year[3] + "00001"
        end = str_year[2] + str_year[3] + "99999"
        for i in range(int(start), int(end), 1):

    # Loop for the year 2000
        # for i in range(1, 99999, 1):
        #     i = str(i)
        #     while 7 - len(i) != 0:
        #         i = "0" + i
            # file_name = "0" + str(i) + ".xml"  # for years 2001 to 2009
            file_name = str(i) + ".xml"
            full_file = os.path.abspath(os.path.join(year_num, file_name))
            try:
                dom = ElementTree.parse(full_file)
                valid_nums.append(i)
            except:
                pass

        err = []
        nope = []
        for i in valid_nums:
            try:
                # file_name = "0" + str(i) + ".xml" # for years 2001 to 2009
                file_name = str(i) + ".xml"
                full_file = os.path.abspath(os.path.join(year_num, file_name))
                dom = ElementTree.parse(full_file)
                start_year = dom.find("Award/AwardEffectiveDate").text
                start_year = start_year[6:10]
                try:
                    abr = dom.find("Award/Organization/Division/Abbreviation").text
                    area = dom.find("Award/Organization/Directorate/Abbreviation").text
                    sub_area = dom.find("Award/Organization/Division/LongName").text
                except:
                    area = ""
                    sub_area = dom.find("Award/Organization/Division/LongName").text
                    abr = code.get(sub_area.lower())
                f_list = []
                first_name = dom.findall("Award/Investigator/FirstName")
                last_name = dom.findall("Award/Investigator/LastName")
                for p in range(0, len(first_name), 1):
                    f_list.append(first_name[p].text + " " + last_name[p].text)
                try:
                    institution_name = dom.find("Award/Institution/Name").text
                    if f_list[0].split()[0] in institution_name:
                        institution_name = dom.find(
                            "Award/Performance_Institution/Name"
                        ).text
                except:
                    institution_name = dom.find(
                        "Award/Performance_Institution/Name"
                    ).text
                amt = dom.find("Award/AwardAmount").text
                if len(f_list) == 0 or area == "BFA":
                    nope.append(i)
                else:
                    data = (
                        abr,
                        int(amt),
                        json.dumps({"faculty": f_list}),
                        institution_name,
                        start_year,
                        str(i),
                    )
                    dbase.db_append(data)
            # FOR other years not included
                # if start_year == "2000" or start_year == "2001" or start_year == "2002":
                #     data = (
                #         abr,
                #         int(amt),
                #         json.dumps({"faculty": f_list}),
                #         institution_name,
                #         start_year,
                #         str(i),
                #     )
                #     dbase.db_append(data)
            except:
                err.append(i)
        # print(err)
        # print(nope)
        dbase.conn.commit()
    dbase.conn.close()


def get_ints():
    dbase = SQLCommands.Database("_2000_2022")
    dbase.c.execute("SELECT institution_name FROM _2000_2022")
    institutions = dbase.c.fetchall()
    ints = {}
    for r in institutions:
        if r in ints.keys(): 
            ints[r] += 1
        else: 
            ints[r] = 1
    dbase.conn.commit()
    dbase.conn.close()
    dbase = SQLCommands.Database("_2000_2022")
    for i in ints.keys():
        if ints[i] < 130:
            dbase.c.execute("DELETE FROM _2000_2022 WHERE institution_name=?", (i[0],))
        else: 
            sql = "INSERT INTO institution (institution_name) VALUES(?,) "
            dbase.c.execute(sql, (i[0]))
    dbase.conn.commit()
    dbase.conn.close()


def to_json():
    dbase = SQLCommands.Database("_2000_2022")
    dbase_json = SQLCommands.Database_json()
    dbase_json.c.execute(
        "CREATE TABLE IF NOT EXISTS json_2000_2022 ( id integer PRIMARY KEY, int_name, institution_json, total);"
    )
    dbase.c.execute("SELECT institution_name FROM institution")
    institutions = dbase.c.fetchall()
    int_info = {}
    for r in institutions:
        int_info = {
            'institution_name': r[0],
            'all_areas_grants': 0,
        }
        for year in range(2000, 2021 + 1, 1):
            int_info[str(year)] = {}
            for a in areas.keys():
                dbase.c.execute(
                    "SELECT faculty, amt FROM _2000_2022 WHERE institution_name=? AND abr=? AND start_year=?;",
                    (r[0], a, str(year)),
                )
                projects = dbase.c.fetchall()
                if len(projects) != 0:
                    int_info["all_areas_grants"] += len(projects)
                    int_info[str(year)][a] = {
                        "area_total": len(projects),
                        "amt_total": 0,
                        "faculties": {},
                    }
                    for [p, amt] in projects:
                        int_info[str(year)][a]["amt_total"] += amt
                        faculty = json.loads(p) # list of faculty members\
                        for f in faculty["faculty"]:
                            count = round(
                                1 / len(faculty["faculty"]), 3
                            )  # each person only gets 1/N, with N being the total number of people included in the grant
                            amount = round(
                                (1 / len(faculty["faculty"]) * amt)
                            )
                            if f in int_info[str(year)][a]["faculties"].keys():
                                int_info[str(year)][a]["faculties"][f][0] += 1
                                int_info[str(year)][a]["faculties"][f][1] += count
                                int_info[str(year)][a]["faculties"][f][2] += amount
                            else:
                                int_info[str(year)][a]["faculties"][f] = [1, count, amount]
        sql = "INSERT INTO json_2000_2022 (int_na me, institution_json, total) VALUES(?, ?, ?) "
        dbase_json.c.execute(sql, (r[0], json.dumps(int_info), int_info["all_areas_grants"]))
    dbase_json.conn.commit()
    dbase.conn.commit()
    dbase_json.conn.close()
    dbase.conn.close()




if __name__ == "__main__":
    to_json()

    



# MISC PROGRAMS:
# Update year from 11/11/2011 to only year 2011
# def update_year():
#     dbase = SQLCommands.Database("_2001_to_2010")
#     dbase.c.execute(
#         "SELECT awardID, start_year FROM _2001_to_2010"
#     )
#     rows = dbase.c.fetchall()
#     for r in rows:
#         try:
#             sql = 'UPDATE _2001_to_2010 SET start_year = ? WHERE awardID = ? '
#             dbase.c.execute(sql, (r[1][6:10], r[0]))
#             dbase.conn.commit()
#         except:
#             print("nah")
#     dbase.conn.close()
# GET TOP 50 SCHOOLS
# def top_50_schools():
#     dbase = SQLCommands.Database("_2014")
#     dbase.c.execute("SELECT institution_json FROM institution_info ORDER BY total DESC")
#     rows = dbase.c.fetchall()
#     area = areas.keys()
#     print(area)
#     for a in area:
#         a_data = []
#         for r in rows:
#             total = 0
#             for y in range(2015, 2022, 1):
#                 int_data = json.loads(r[0])
#                 # print(int_data['institution_name'])
#                 try:
#                     total += (len(int_data[str(y)][a]))
#                 except:
#                     pass
#             if total != 0:
#                 a_data.append([int_data['institution_name'], total])
#         a_data.sort(key=lambda x: x[1])
#         a_data.reverse()
#         print(a, a_data[:50])

# Version 1
# def pre_to_json():
#     dbase = SQLCommands.Database("_2000_2025")
#     dbase.c.execute(
#         "CREATE TABLE IF NOT EXISTS json_2000_2025 ( id integer PRIMARY KEY, int_name, json, total)"
#     )

#     dbase.c.execute(
#         "SELECT institution_json FROM pre_2000_2022 ORDER BY total DESC LIMIT 500"
#     )
#     rows = dbase.c.fetchall()
#     area = areas.keys()
#     f_total = []
#     sql = "INSERT INTO json_2000_2025 (int_name, json, total) VALUES(?, ?, ?) "
#     for r in rows:
#         int_data = json.loads(r[0])
#         data = {
#             "institution_name": (int_data["institution_name"]),
#             "all_areas_grants": 0,
#             "total_faculty": 0,
#         }
#         all_profs = []
#         for a in area:
#             data[a] = {"area_total": 0, "area_total_faculty": 0}
#             for y in range(2000, 2023, 1):
#                 try:
#                     prof_list = []
#                     prof_list = [
#                         j for r in rows for i in int_data[str(y)][a] for j in i
#                     ]  # list of all professors
#                     data[a][str(y)] = {}
#                     a_data = {}
#                     amount_of_grants = len(int_data[str(y)][a])
#                     data[a][str(y)]["total_year_grants"] = amount_of_grants
#                     data[a]["area_total"] += amount_of_grants
#                     data["all_areas_grants"] += amount_of_grants
#                     profs = set(prof_list)
#                     data[a][str(y)]["total_year_faculty"] = len(profs)
#                     data[a]["area_total_faculty"] += len(profs)
#                     all_profs += profs
#                     for p in profs:
#                         count = 0
#                         try:
#                             for list in int_data[str(y)][a]:
#                                 if p in list:
#                                     count += 1
#                             a_data[p] = count
#                         except:
#                             pass
#                     a_data = {
#                         k: v
#                         for k, v in sorted(
#                             a_data.items(), key=lambda item: item[1], reverse=True
#                         )
#                     }
#                     data[a][str(y)]["staff"] = a_data
#                 except:
#                     pass
#             data["total_faculty"] = len(set(all_profs))
#             if data[a]["area_total"] == 0:
#                 del data[a]

#         dbase.c.execute(
#             sql,
#             (int_data["institution_name"], json.dumps(data), data["all_areas_grants"]),
#         )
#         # print(data)
#     dbase.conn.commit()
#     dbase.conn.close