import os
import requests
from bs4 import BeautifulSoup


def get_country(tr):
    while 1:
        print('\n')
        select = input('#: ')
        if not select.isdigit():
            print("That wasn't a number")
        elif int(select) > len(tr):
            print('Choose a number from the list.')
        else:
            break
    tr1 = tr[int(select)]
    td = tr1.find_all('td')
    return td


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

print('Welcome to CurrenctConvert PRO 2000\n')
for r in tr:
    td = r.find_all('td')
    print(f'# {tr.index(r)} {td[0].text}')
print('\n')

print('Where are you from? Choose a country by number.')
country1 = get_country(tr)
print(f'{country1[0].text}\n')

print('Now choose another country.')
country2 = get_country(tr)
print(f'{country2[0].text}\n')

print(
    f'How many {country1[0].text} do you want to convert to {country2[0].text}?')
while 1:
    amount = input()
    if not amount.isdigit():
        print("That wasn't a number.")
    else:
        break

url = f'https://transferwise.com/gb/currency-converter/{country1[2].text}-to-{country2[2].text}-rate?amount=50'
req = requests.get(url)
con = req.content
html = BeautifulSoup(con, 'html.parser')

table = html.find('div', {'class': 'col-lg-6 text-xs-center text-lg-left'})
h3 = table.find('h3', {'class': 'cc__source-to-target'})
span = h3.find_all('span')
exchange = span[2].text

result = int(float(amount) * float(exchange))
print(f'{country1[2].text} {amount} is {country2[2].text} {result}')
