function bitly_dados() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('links');
  const apiToken = 'Seu Token do Bitly'; // Substitua pelo seu token de API
  const groupGuid = 'ID Group GUID'; // Substitua pelo seu Group GUID do Bit.ly
  const urlBase = `https://api-ssl.bitly.com/v4/groups/${groupGuid}/bitlinks`;
  const optionsBase = {
    'method': 'get',
    'headers': {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    }
  };

  const responseBase = UrlFetchApp.fetch(urlBase, optionsBase);
  const result = JSON.parse(responseBase.getContentText());
  const links = result.links || [];

  if (links.length > 0) {
    // Limpa a planilha antes de adicionar novos dados
    sheet.clear();
    // Adiciona cabeçalhos
    sheet.appendRow(['Data de Criação', 'Título', 'Tags','Cliques', 'Link Original', 'Link Encurtado']);

    links.forEach(link => {
      const createdAt = link.created_at;
      const longUrl = link.long_url;
      const shortLink = link.link;
      const tags = link.tags.join(', ');
      const title = link.title || 'Sem título';

      // Obter cliques requer uma chamada de API separada
      const clicks = getClicksForLink(apiToken, link.id); // Função auxiliar para obter cliques

      sheet.appendRow([createdAt, title, tags, clicks, longUrl, shortLink ]);
    });
  } else {
    Logger.log('Nenhum link encontrado.');
  }
}

function getClicksForLink(apiToken, linkId) {
  const url = `https://api-ssl.bitly.com/v4/bitlinks/${linkId}/clicks/summary`;
  const options = {
    'method': 'get',
    'headers': {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    return result.total_clicks;
  } catch (e) {
    console.error('Erro ao obter cliques para o link: ', e);
    return 0; // Retorna 0 em caso de erro
  }
}
