import axios from 'axios';

export default function Home() {
    const sended = (e) => {
        e.preventDefault();

        // deklarasi variabel
        const msg = document.querySelector('#msg');
        const msgList = document.querySelector('#msgList');

        if (msg.value) {
            // getting data
            let url =
                'https://cors-anywhere.herokuapp.com/https://simsimi.info/api/?text=' +
                msg.value +
                '&lc=id';

            // post message
            let selfMsg = document.createElement('p');
            selfMsg.style.textAlign = 'right';
            selfMsg.textContent = msg.value;
            msg.value = '';
            msgList.appendChild(selfMsg);

            let profImgSimi = document.createElement('img');
            profImgSimi.style.width = '30px';
            profImgSimi.style.height = '30px';
            profImgSimi.style.borderRadius = '100%';
            profImgSimi.src =
                'https://i.pinimg.com/736x/63/d2/86/63d2865f4f8f1c5784f56aeae88cbf6f.jpg';
            msgList.appendChild(profImgSimi);

            let profSimi = document.createElement('span');
            profSimi.style.fontWeight = 'bold';
            profSimi.style.textAlign = 'left';
            const nameBot = localStorage.getItem('botName');
            profSimi.textContent = ' ' + nameBot;
            msgList.appendChild(profSimi);

            let simiTyping = document.createElement('p');
            simiTyping.style.textAlign = 'left';
            simiTyping.style.fontStyle = 'italic';
            simiTyping.textContent = 'sedang mengetik..';
            msgList.appendChild(simiTyping);

            axios.get(url).then(function (res) {
                // response simi

                let simiMsg = document.createElement('p');
                simiMsg.style.textAlign = 'left';
                simiMsg.style.marginTop = '0.25rem';
                simiMsg.style.lineHeight = '1.2';
                simiMsg.style.maxWidth = '70%';
                simiMsg.textContent = res.data.success;
                msgList.removeChild(simiTyping);
                msgList.appendChild(simiMsg);
            });
        } else {
            alert('Warning, Pesan tidak boleh kosong!');
        }
    };

    const saveSettings = (e) => {
        e.preventDefault();

        const login = document.querySelector('#login');
        const mainCard = document.querySelector('#main-card');

        const bName = document.querySelector('#nameBot').value;

        if (bName) {
            localStorage.setItem('botName', bName);

            login.style.display = 'none';
            mainCard.style.display = 'flex';
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form id="login">
                    <label>Name BOT</label>
                    <input
                        type="text"
                        id="nameBot"
                        name="nameBot"
                        className="form-control mb-2"
                    ></input>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary fw-bold"
                            onClick={saveSettings}
                        >
                            LOGIN
                        </button>
                    </div>
                </form>

                <div id="main-card" className="card border-0">
                    <div className="card-header d-flex justify-content-between">
                        <div className="fw-bold">BOT Chat</div>
                        <span className="text-sm">Version 1.0</span>
                    </div>
                    <div id="cardList" className="card-body overflow-scroll">
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
