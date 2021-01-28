import requests
import os


def fck(url):
    url = url.strip()
    if url.find('.') == -1:
        return f'{url} is not a valid URL.'
    if not url.startswith('http://'):
        url = f'http://{url}'
    try:
        requests.get(url)
        return f'{url} is up!'
    except:
        return f'{url} is down!'


loop = 'y'

while(loop == 'y'):
    os.system('clear')
    print('Welcome to IsItDown.py!')
    print('Please write a URL or URLs you want to check. (separated by comma)')
    url_list = input().split(',')
    for i in range(0, len(url_list)):
        print(fck(url_list[i]))
    again = None
    while(again != 'y' and again != 'n'):
        again = input('Do you want to start over? y/n ')
        if again.lower() == 'y':
            loop = 'y'
            break
        elif again.lower() == 'n':
            loop = 'n'
            print('ok. bye!')
        else:
            print("That's not a valid answer!")
