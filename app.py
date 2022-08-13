from crypt import methods
from flask import Flask, render_template, request, redirect, session, url_for
from scrape import scrape
from apiclient import discovery

DEV_KEY = "AIzaSyCPVqdLCgvMASFgWneTmg8TYoUlRc6djcw"
youtube = discovery.build('youtube', 'v3', developerKey=DEV_KEY)

app = Flask(__name__)
app.secret_key = 'my secret key'

@app.route('/', methods = ["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files.get('file')
        mega_list = []
        tags = []
        for tag in file:
            tag = str(tag)
            tag = tag.removeprefix('b')
            tag = tag.replace(r"\n", '')
            tags.append(tag)

        url = request.form.get('url')
        id = url.split('=')[-1]
        sorted_data = []
        if url is not None and url != '':
            results = youtube.videos().list(id=id, part='snippet').execute()
            tags = results.get('items')[0]['snippet']['tags']

        for tag in tags:
            mega_list.extend(scrape(tag))
        dictionary = {}
        for link in mega_list:
            currCount = dictionary.setdefault(link, 0)
            if currCount != 0:
                dictionary[link] = currCount + 1
            else:
                dictionary[link] = 1

        sorted_data = sorted(dictionary.items(), key=lambda x:x[1], reverse=True)
        return render_template('links.html', data=sorted_data)
        
        
    
    return render_template('index.html')




if __name__ == '__main__':
	app.run(debug=True, threaded=True)