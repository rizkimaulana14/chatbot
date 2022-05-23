import axios from 'axios';

export default function handler(req, res) {
    const query = req.query.msg;
    let url =
        `https://api-sv2.simsimi.net/v2/?text=` + query + `&lc=id&cf=false`;
    axios
        .get(url)
        .then(function (respon) {
            let data = respon.data.success;
            data = data.replace('simi', 'aku');
            data = data.replace('Sim', 'aku');
            data = data.replace('iya kak jusman', 'oi..');
            data = data.replace('duduk', 'baik..');
            data = data.replace('?', '..?');
            data = data.replace(':', '.. :');
            data = data.replace('Bukan muhrim', 'Mmwahh.. 😙');
            data = data.replace('apa kabar kamu', 'apa kabar kamu..?');
            data = data.replace(
                'Aku tidak mengerti apa yang kamu katakan.Tolong ajari aku.',
                'ayang ngga ngerti.. 😭',
            );

            let pap = '';
            if (query == 'pap ayang' || query == 'pap' || query == 'pap dong') {
                pap = 'found';
            }

            res.status(200).json({ ayang: data, photo: pap });
        })
        .catch(function (e) {
            console.log(e);
        });
}
