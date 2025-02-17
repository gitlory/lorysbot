

const handler = async (m, {conn, usedPrefix, command}) => {
  const q = m.quoted ? m.quoted : m;
  const FormData = require('form-data');
  const axios = require('axios');
  const mime = (m.quoted ? m.quoted : m.msg).mimetype || '';
  if (!/video|audio/.test(mime)) throw `Balas music yang ingin dicari dengan caption *${usedPrefix + command}*`;
  m.reply('Wait Ngap, Lagi Cari....');
  const bodyForm = new FormData();
			        bodyForm.append('audio', await q.download(), 'music.mp3');
           			bodyForm.append('apikey', 'caliph_71');
           			axios('https://api.zeks.me/api/searchmusic', {
                		method: 'POST',
                		headers: {
      'Content-Type': 'multipart/form-data',
        			...bodyForm.getHeaders(),
                		},
                		data: bodyForm,
            			})
                		.then(({data}) =>{
				  m.reply(`*Lagu Ditemukan!*\n\n*Judul* : ${data.data.title}\n*Artist* : ${data.data.artists}\n*Genre* : ${data.data.genre}\n*Album* : ${data.data.album}\n*Release* : ${data.data.release_date}`);
      }).catch(() => {
        m.reply('Lagu Tidak Ditemukan!');
      });
};
handler.help = ['whatmusic'];
handler.tags = ['tools'];

handler.command = /^(whatmusic)$/i;
export default handler;
