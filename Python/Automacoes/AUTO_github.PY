import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

servico = Service(ChromeDriverManager().install())
navegador = webdriver.Chrome(service=servico, options=chrome_options)

navegador.get("https://github.com/")
time.sleep(2)

navegador.find_element('xpath','//*[@id="FormControl--:Rjahb:"]/div/button').click()
time.sleep(2)

navegador.find_element('xpath','//*[@id="email"]').send_keys(os.getenv("GITHUB_EMAIL", ""))
time.sleep(2)

navegador.find_element('xpath','//*[@id="password"]').send_keys(os.getenv("GITHUB_PASSWORD", ""))
time.sleep(2)

navegador.find_element('xpath','//*[@id="login"]').send_keys(os.getenv("GITHUB_USERNAME", ""))
time.sleep(2)



