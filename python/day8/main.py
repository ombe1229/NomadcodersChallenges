import os
import csv
import requests
from bs4 import BeautifulSoup

os.system("clear")
alba_url = "http://www.alba.co.kr"

req = requests.get(alba_url)
con = req.content
html = BeautifulSoup(con, 'html.parser')

list_table = html.find_all('ul', {'class': 'goodsBox'})
brand = list_table[1].find_all('li')
brand.pop()

for b in brand:
    a = b.find('a')
    brand_url = a.get('href')
    company = a.find('span', {'class': 'company'}).text

    req = requests.get(brand_url)
    con = req.content
    html = BeautifulSoup(con, 'html.parser')

    div = html.find('div', {'class': 'goodsList goodsJob'})
    tbody = div.find('tbody')
    tr = tbody.find_all('tr')

    file = open(f'{company}.csv', mode='w')
    writer = csv.writer(file)
    writer.writerow(['place', 'title', 'time', 'pay', 'date'])

    for t in tr:
        td = t.find_all('td')
        try:
            pay_span = td[3].find_all('span')
            place = td[0].text.replace('\xa0', ' ')
            title = td[1].find('span').text
            time = td[2].find('span').text
            salary = pay_span[0].text
            pay = pay_span[1].text
            date = td[4].text

            info = [place, title, time, f'{salary}{pay}', date]
            print(info)
        except:
            pass

        file = open(f'{company}.csv', mode='a')
        writer = csv.writer(file)
        writer.writerow(info)
