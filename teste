function bitly_dados() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('links');
  const apiToken = '0c38f16b7fc3e5cd19787a85709cea9a50279bd2'; // Substitua pelo seu token de API
  const groupGuid = 'Bo32lIYriUa'; // Substitua pelo seu Group GUID do Bit.ly
  const url = `https://api-ssl.bitly.com/v4/groups/${groupGuid}/bitlinks`;
  const options = {
    'method': 'get',
    'headers': {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());
  const links = result.links || [];

  if (links.length > 0) {
    // Limpa a planilha antes de adicionar novos dados
    sheet.clear();
    // Adiciona cabeçalhos
    sheet.appendRow(['Data de Criação', 'Título', 'Tags' , 'Link Original', 'Link Encurtado', 'Cliques']);

    // Itera por cada link e adiciona na planilha
    links.forEach(link => {
      const createdAt = link.created_at; // Formatar data conforme necessário
      const longUrl = link.long_url;
      const shortLink = link.link;
      const clicks = link.clicks; // Este campo pode precisar ser ajustado conforme a estrutura da resposta
      const tags = link.tags.join(', ');
      const title = link.title || 'Sem título';

      sheet.appendRow([createdAt, title, tags, longUrl, shortLink, clicks,]);
    });
  } else {
    Logger.log('Nenhum link encontrado.');
  }
}
