from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options



chrome_options = Options()
chrome_options.add_experimental_option("detach", True)


servico = Service(ChromeDriverManager().install())
navegador = webdriver.Chrome(service=servico, options=chrome_options)


navegador.get("https://pages.hashtagtreinamentos.com/arquivo-python-1jGh7kZSxQLoznA_GgwnWa8f7LEl3kKCZ?origemurl=hashtag_yt_org_planilhapyt_8AMNaVt0z_M")
navegador.find_element('xpath', ' //*[@id="section-17877670"]/section/div[2]/div/form/div[1]/div/div/div/input ').send_keys("xxxxxx")
navegador.find_element('xpath', ' //*[@id="section-17877670"]/section/div[2]/div/form/button ').click()
navegador.find_element('xpath', ' //*[@id="email"] ') .send_keys("lucassantanadias2008@gmail.com")
navegador.find_element('xpath', ' //*[@id="_form_4746_submit"] ').click()





