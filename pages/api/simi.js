import axios from 'axios';

export default function handler(req, res) {
    let url =
        `https://api-sv2.simsimi.net/v2/?text=` +
        req.query.msg +
        `&lc=id&cf=false`;
    axios
        .get(url)
        .then(function (respon) {
            res.status(200).json({ pesan: respon.data.success });
        })
        .catch(function (e) {
            console.log(e);
        });
}
