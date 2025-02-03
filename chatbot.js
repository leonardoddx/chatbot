const { Client, LocalAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js'); 
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(), // Usa a sessão salva em .wwebjs_cache
    puppeteer: {
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--disable-gpu",
        ]
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|MENU|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000); 
        await client.sendMessage(msg.from, 'Oii meu anjo, tudo bem?? Me chamo Gabriela ☺️');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Ah, eu salvei seu contato aqui! Já salva o meu aí também hein rsrs 💞');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, name.split(" ")[0] + ', você já deve imaginar que eu trabalho com a venda de conteúdos adultos, da uma olhadinha nas opções abaixo e digite o número da que você estiver interessado:\n\n1 - GRUPO VIP TELEGRAM\n2 - GRUPO DE PRÉVIAS TELEGRAM\n3 - PACKS AVULSOS\n4 - MÉTODO DE PAGAMENTO\n5 - OUTRAS DÚVIDAS');
        await chat.sendStateTyping();
        await delay(2000);
    }

    const responses = {
        '1': '🔥 Descubra um pouco mais do meu mundinho íntimo que você sempre quis ver! 🔥\n\nO valor da assinatura mensal do meu grupinho VIP no telegram custa apenas: R$36,90 ✔️\n\nPara entrar, faça o pagamento por este link:\nhttps://pay.cakto.com.br/VCdEY5c\n\nCOMO RECEBO O ACESSO?\nLogo após o pagamento, você receberá no e-mail o link para o grupo VIP.',
        '2': 'Para entrar no meu grupo de prévias e amostras grátis, clique no link:\nhttps://t.me/+-oF6EAmBcN1kODJh\n\n❤️ Caso queira comprar o grupinho VIP, acesse:\nhttps://pay.cakto.com.br/VCdEY5c',
        '3': 'Para adquirir packs avulsos ou ensaios fotográficos completos, digite "packs" e aguarde que em breve entrarei em contato com a lista disponível 🙈🔥😈✅',
        '4': 'Você pode pagar através de:\n\nPIX / Cartão de crédito / Pic Pay / Boleto\n\n❤️ Caso queira comprar o grupinho VIP, acesse:\nhttps://pay.cakto.com.br/VCdEY5c',
        '5': 'Se tiver outras dúvidas ou precisar de mais informações, digite "outras dúvidas" e aguarde, pois em breve entrarei em contato ☺️'
    };

    if (msg.body in responses && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, responses[msg.body]);
    }
});
