import axios from 'axios';

export default function Home() {
    const sended = (e) => {
        e.preventDefault();

        // deklarasi variabel
        const msg = document.querySelector('#msg');
        const msgList = document.querySelector('#msgList');

        if (msg.value) {
            // post message
            let selfMsg = document.createElement('p');
            selfMsg.style.textAlign = 'right';
            selfMsg.textContent = msg.value;
            msgList.appendChild(selfMsg);

            // getting data
            axios
                .get(
                    'https://xteam.xyz/simsimi?kata=' +
                        msg.value +
                        '&APIKEY=ba0666066ec029b8',
                )
                .then(function (res) {
                    // response simi
                    let simiMsg = document.createElement('p');
                    simiMsg.style.textAlign = 'left';
                    simiMsg.textContent = res.data.jawaban;
                    msg.value = '';
                    msgList.appendChild(simiMsg);
                });
        } else {
            alert('Warning, Pesan tidak boleh kosong!');
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card border-0">
                    <div className="card-header d-flex justify-content-between">
                        <div className="fw-bold">BOT Chat</div>
                        <span className="text-sm">Version 1.0</span>
                    </div>
                    <div className="card-body overflow-scroll">
                        <div id="msgList"></div>
                        <div id="myMsg"></div>
                    </div>
                    <div className="card-footer">
                        <form id="form">
                            <div className="d-flex gap-1">
                                <input
                                    type="text"
                                    id="msg"
                                    name="msg"
                                    className="form-control"
                                    placeholder="Masukan pesan.."
                                />

                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    value="KIRIM"
                                    onClick={sended}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
