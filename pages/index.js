import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        const botName = localStorage.getItem('botName');

        if (botName) {
            const login = document.querySelector('#login');
            const mainCard = document.querySelector('#main-card');
            const headPhoto = document.querySelector('#photoo');
            const headName = document.querySelector('#namee');

            headName.textContent = ' ' + localStorage.getItem('botName');
            headPhoto.src = localStorage.getItem('botPhoto');

            login.style.display = 'none';
            mainCard.style.display = 'flex';
        }
    });

    const sended = (e) => {
        e.preventDefault();

        // deklarasi variabel
        const msg = document.querySelector('#msg');
        const msgList = document.querySelector('#msgList');
        const cardList = document.querySelector('#cardList');

        if (msg.value) {
            // getting data
            let url = 'api/app?msg=' + msg.value;

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
            let urlPhoto = localStorage.getItem('botPhoto');
            profImgSimi.src = urlPhoto;
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
                if (res.data.photo) {
                    let pap = document.createElement('img');
                    pap.src = localStorage.getItem('botPhoto');
                    pap.style.display = 'block';
                    pap.style.borderRadius = '0.25rem';
                    pap.style.marginTop = '0.50rem';
                    pap.style.width = '50%';
                    msgList.removeChild(simiTyping);
                    msgList.appendChild(pap);
                } else {
                    let simiMsg = document.createElement('p');
                    simiMsg.style.textAlign = 'left';
                    simiMsg.style.marginTop = '0.25rem';
                    simiMsg.style.lineHeight = '1.2';
                    simiMsg.style.maxWidth = '70%';
                    simiMsg.textContent = res.data.ayang;
                    msgList.removeChild(simiTyping);
                    msgList.appendChild(simiMsg);
                }
            });
        } else {
            alert('Pesan tidak boleh kosong!');
        }
        cardList.scrollTop = cardList.scrollHeight;
    };

    const saveSettings = (e) => {
        e.preventDefault();

        const login = document.querySelector('#login');
        const mainCard = document.querySelector('#main-card');

        const bName = document.querySelector('#nameBot').value;
        const bPhoto = document.querySelector('#photoBot').value;

        if (bName) {
            localStorage.setItem('botName', bName);
            if (bPhoto) {
                localStorage.setItem('botPhoto', bPhoto);
            } else {
                localStorage.setItem(
                    'botPhoto',
                    'https://i.pinimg.com/736x/63/d2/86/63d2865f4f8f1c5784f56aeae88cbf6f.jpg',
                );
            }

            login.style.display = 'none';
            mainCard.style.display = 'flex';

            const headPhoto = document.querySelector('#photoo');
            const headName = document.querySelector('#namee');

            headName.textContent = ' ' + localStorage.getItem('botName');
            let urlFoto = '';
            if (localStorage.getItem('botPhoto')) {
                urlFoto = localStorage.getItem('botPhoto');
            } else {
                urlFoto =
                    'https://i.pinimg.com/736x/63/d2/86/63d2865f4f8f1c5784f56aeae88cbf6f.jpg';
            }

            headPhoto.src = urlFoto;
        }
    };

    const logout = () => {
        localStorage.removeItem('botName');
        localStorage.removeItem('botPhoto');

        location.reload();
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
                        placeholder="Ayang"
                    ></input>
                    <label>Photo BOT</label>
                    <input
                        type="text"
                        id="photoBot"
                        name="photoBot"
                        className="form-control mb-2"
                        placeholder="Enter url photo"
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
                        <div className="fw-bold">
                            <img
                                id="photoo"
                                width="30px"
                                height="30px"
                                className="rounded-circle"
                            ></img>
                            <span id="namee"></span>
                        </div>
                        <button
                            className="btn btn-sm fw-bold btn-danger"
                            onClick={logout}
                        >
                            UDAHAN
                        </button>
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
