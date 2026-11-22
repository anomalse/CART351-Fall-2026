from flask import Flask,render_template,request
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import random

#helper arrays
days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
weather = ['stormy','raining','sunny','cloudy','clear', 'snowing', 'grey', 'fog']
moods = ['happy','sad', 'angry','neutral','calm', 'anxious', 'serene','moody','well','hurt']

event_names = ['walking in a forest','swimming in the ocean','dining with sibling','taking a nap with a cat',
          'watching rain fall though the window',
          'reading a comic','baking a chocolate cake','rollerskating','reading a comic',
          'planting roses','chomping on carrots','whistling in the wind',
          'walking through a dark tunnel','sunbathing in the desert','visitng a parent for an afternoon',
          'learning a new programming language','running up stairs']


positive_moods = ['happy','neutral','calm','serene','well']
negative_moods = ['sad','angry','neutral','calm', 'anxious','moody','hurt']


load_dotenv()  # Load variables from .env and .flaskenv
db_user = os.getenv('MONGODB_USERNAME')
db_pass = os.getenv('MONGODB_PASSWORD')
print(db_user)
uri = os.getenv("MONGODB_URI")
db_name = os.getenv('DATABASE_NAME')
uri = uri+f"/{db_name}?retryWrites=true&w=majority"
app = Flask(__name__)
# set a config var
app.config["MONGO_URI"] = uri

mongo = PyMongo(app)
print (mongo.db)
print("Pinged your deployment. You successfully connected to MongoDB!")

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/insertPage')
def insertPage():
    return render_template("insertPage.html")

@app.route('/insertData')
def insertData():
    print("here")
    data =[]
    for i in range(1000):
        a = random.randrange(0,6)
        b = random.randrange(0,7)
        c = random.randrange(0,9)
        d = random.randrange(0,9)
        e = random.randrange(1,10)
        f = random.randrange(1,10)
        g = random.randrange(1,17)
        singleEntry ={}
        singleEntry["dataId"] = i+1
        singleEntry["day"]=days[a]
        singleEntry["weather"] =weather[b]
        singleEntry["start_mood"]=moods[c]
        singleEntry["after_mood"] = moods[d]
        singleEntry["after_mood_strength"] = e
        singleEntry["event_affect_strength"] =f
        singleEntry["event_name"]=event_names[g]
        data.append(singleEntry)

    try:
         # insert many works :)
        result = mongo.db.dataStuff.insert_many(data)
        return {"inserted":"success"}
    except Exception as e:
        print(e)



@app.route("/debugView")
def debugView():
    return render_template("debugView.html")


@app.route("/niceView")
def niceView():
    return render_template("niceView.html")


@app.route("/onload")
def onload():

    #get all
    results= mongo.db.dataStuff.find()
    #pass results AND the helper array
    return({"results":results,"days":days})

@app.route("/default")
def default():

    #get all
    results= mongo.db.dataStuff.find()
    #pass results AND the helper array
    return({"results":results,"days":days})


@app.route("/one")
def one():

    #get all and sort by mood
    results= mongo.db.dataStuff.find().sort("after_mood",1)
    #pass results AND the helper array
    return({"results":results,"moods":moods})

@app.route("/two")
def two():
    results= mongo.db.dataStuff.find().sort("weather",1)

    return({"results":results,"events":event_names})

'''
check if there has been something posted to the server to be processed
/*********** TO COMPLETE FOR EXERCISE 4 **********************************
** 1: you need to implement the correct mongodb (three->six) as per the exercise description.
** 2: please use the following if statements to implement (1). 
** 3: you DO NOT NEED to change the manner in which the result is received,
** 4: you MAY add helper arrays (declared at the top) as other properties to the returned objects
**   if you wish. See the  examples for suggested implementation
'''
@app.route("/three")
def three():
 return({"results":"not yet done"})


@app.route("/four")
def four():
 return({"results":"not yet done"})

@app.route("/five")
def five():
    return({"results":"not yet done"})

@app.route("/six")
def six():
     return({"results":"not yet done"})

app.run(debug = True)

