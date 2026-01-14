import telebot 

chaveAPi = "8407116915:AAFIPuLh0oLW7h0n6pI2Mq6UclC-lVp05dk"
bot = telebot.TeleBot(chaveAPi)

def verificar(mensagem):
    return True


@bot.message_handler(commands=["produtos"])
def produtos(mensagem):
    rep2=""" 📚 *Catálogo de Produtos da Livraria*:

1. _O Pequeno Príncipe_ — R$ 29,90
2. _1984_ (George Orwell) — R$ 39,90
3. _Dom Casmurro_ (Machado de Assis) — R$ 24,90
4. _Harry Potter e a Pedra Filosofal_ — R$ 49,90
5. _A Arte da Guerra_ — R$ 34,90
6. _Box Coleção Sherlock Holmes_ — R$ 119,90

🛍️ Para fazer um pedido, envie o nome do livro ou o número correspondente. """
    bot.reply_to(mensagem, rep2)



@bot.message_handler(commands=["pagamento"])
def pagamento(mensagem):
    rep3= """ 💳 *Formas de Pagamento*:

Aceitamos:
• Pix
• Cartão de crédito (Visa, Master, Elo)
• Cartão de débito
• Boleto bancário
• Dinheiro (apenas para retiradas presenciais)

📌 Após escolher seus produtos, enviaremos os dados para pagamento.
"""
    bot.reply_to(mensagem, rep3)




@bot.message_handler(commands=["entrega"])
def entrega(mensagem):
    rep4=""" 🚚 *Informações sobre Entrega*:

• Entregamos para todo o Brasil via Correios
• Frete grátis para compras acima de R$ 150
• Prazo médio: 3 a 7 dias úteis
• Retirada presencial disponível em Capão da Canoa

📦 Após o pagamento, você receberá o código de rastreio. """   
    bot.reply_to(mensagem, rep4)


@bot.message_handler(commands=["contato"])
def contato(mensagem):
    rep5 = """ 📞 *Fale com um atendente*:

• WhatsApp: (51) 99999-0000
• E-mail: atendimento@nomedaloja.com.br
• Instagram: @nomedaloja

🕘 Atendimento de segunda a sábado, das 9h às 18h. """
    bot.reply_to(mensagem, rep5)





@bot.message_handler(func= verificar)
def responder(mensagem):
   rep1="""Olá! 👋 Seja bem-vindo(a) à [Nome da Loja] — é um prazer ter você aqui!

🛒 Aqui você pode:
• Ver nossos produtos e promoções
• Fazer pedidos diretamente pelo chat
• Tirar dúvidas sobre entregas, pagamentos e mais

Digite um dos comandos abaixo para começar:
📦 /produtos — Ver catálogo
💳 /pagamento — Formas de pagamento
🚚 /entrega — Informações sobre frete
📞 /contato — Falar com um atendente

Estamos disponíveis de segunda a sábado, das 9h às 18h. Qualquer dúvida, é só chamar!

Obrigado por escolher a [Nome da Loja] 💙"""
   
   
   bot.reply_to ( mensagem,rep1) 

bot.polling()
