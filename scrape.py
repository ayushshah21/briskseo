import requests
from bs4 import BeautifulSoup
import time

def scrape(tag):
  prefix = 'https://old.reddit.com/search?q='
  suffix = tag.replace(' ', '+')
  url = prefix + suffix

  headers = {'User-Agent': 'Mozilla/5.0'}

  page = requests.get(url, headers=headers)
  time.sleep(0.25)
  soup = BeautifulSoup(page.text, 'html.parser')
  links = []

  content = soup.find('body').contents[5].contents[2].contents[0].contents[1]
  for post in content.contents:
    link = post.contents[0]['href']
    link = "https://www.reddit.com" + link
    links.append(link)
    
    
  
  
  

  return links

  
  