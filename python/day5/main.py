import os
import requests
from bs4 import BeautifulSoup


os.system("clear")
url = "https://www.iban.com/currency-codes"

req = requests.get(url)
con = req.content
html = BeautifulSoup(con, 'html.parser')

table = html.find(
    'table', {'class': 'table table-bordered downloads tablesorter'})
tbody = table.find('tbody')
tr = tbody.find_all('tr')

for r in tr:
    td = r.find_all('td')
    if td[2].text == '':
        tr.remove(r)


print('Hello! Please choose select a country by number:')
for r in tr:
    td = r.find_all('td')
    print(f'# {tr.index(r)} {td[0].text}')
while 1:
    select = input('#: ')
    if not select.isdigit():
        print("That wasn't a number")
    elif int(select) > len(tr):
        print('Choose a number from the list.')
    else:
        break
tr = tr[int(select)]
td = tr.find_all('td')
print(f'The currency code in {td[2].text}')
