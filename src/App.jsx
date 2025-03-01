// Todo:İmport Alanı:
import { useEffect, useState } from "react";
import api from "../api";
// import axios from 'axios';
// <-----------------------------ARA------------------------->
// İcons İmport:
import { RiSearchLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

// <-----------------------------ARA------------------------->
// Components İmport:
import Card from "./components/Card";
import Modal from "./components/Modal";

// <-----------------------------ARA------------------------->
// Todo:Axios'la  BaseURL tanımlama:
// axios.defaults.baseURL = "http://localhost:5001/contact";

// <-----------------------------ARA------------------------->

function App() {
  // todo:State Oluşturduğum yer:Bileşen içinde Verileri yönetmek;
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  // todo:Sayfa Yüklendiğinde API'dan verileri alma:
  useEffect(() => {
    api.get("/contact").then((res) => setContacts(res.data));
    // axios.get("/contact").then((res) => setContacts(res.data));
    //  .get("http://localhost:5001/contact")
    //  .then((res) => console.log(res.data));
  }, []);

  //  console.log(contacts);

  // <-----------------------------ARA------------------------->
  // !Form Gönderildiğinde çalışacak fonksiyon:
  const handleSubmit = (e) => {
    // Sayfa yenilenmesini Engelle:
    e.preventDefault();
    console.log(`Form Başarıyla Gönderildi..`);
    // e.target ilgili Form Elemanına Karşılık geliyor.
    // console.log(e.target);
    // console.log(e);
    // console.log(e.target[1]);
    // İnput içerisindeki değere erişmek için di:
    // console.log(e.target[1].value);
    const text = e.target[1].value;
    console.log("Arama yapılan kelime:", text);

    // Api'a gönderilecek parametreleri belirle:
    const params = {
      q: text,
    };

    // İnputtan alınan değer neticesinde ilgili veriyi Api'den almak için :
    // axios.get("http://localhost:5000/contact", { params }).then((res) => setContacts(res.data));

    api.get("/contact",{params}).then((res) => setContacts(res.data));
    // axios.get("/contact", { params }).then((res) => setContacts(res.data));
  };

  // <-----------------------------ARA------------------------->
  //  Sil butonuna basınca ilgili kişiyi silen fonksiyon:
  const handleDelete = (id) => {
    const res = confirm(`Kişiyi Silmek İstediğinizden Emin misiniz???`);
    // alert(`Kişi Silindi..`);
    // console.log(`Kişi Silindi..`);

    // if (res) {
    //   console.log(`Silme işlemi Başarıyla Gerçekleştirildi..`);
    //   console.log(id + "li kullanıcı silindi.");

    // }
    if (res) {
      // !Api'den id'si bilinen kullancıyı silsin:
      // axios
      api
        .delete(`/contact/${id}`)
        .then(() => {
          // todo:Silinen kişiyi STATE'den de kaldırmak için:örneğin id'si bilinen kişiyi kaldırdık ..
          const updated = contacts.filter((contact) => contact.id == !id);
          // STATE'i güncellemiş olduk..
          setContacts(updated);
        })
        .catch((err) => {
          alert(`Silme işlemi Sırasında Bir Hata Oluştu!!`);
          alert(err);
        });
    } else {
      console.log(`Silme İşlemi İptal Edildi..`);
    }
  };
  // <-----------------------------ARA------------------------->
  //  ! Güncelle ikonuna tıklayınca ilgili kişi verisini güncelleyecek fonksiyon:
  //  const handleEdit =(id)=>{
  //    alert("Güncelleme İşlemi Gerçekleşti..");
  //    alert(id + "'li Kullanıcı Güncellendi.");
  //  }
  const handleEdit = (contact) => {
    // todo:Modal'ı aç:
    setIsModalOpen(true);
    // todo:Güncellenecek Kişiyi State'e Aktarma:
    setEditItem(contact);
  };

  // <-----------------------------ARA------------------------->

  return (
    <div className="app">
      {/* Header Kısmı: */}
      <header>
        <h1>Rehber</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <button>
              <RiSearchLine />
            </button>
            <input type="text" placeholder="Kişi Aratınız." />
          </form>

          <button className="ns">
            <IoMenu />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>
          <button onClick={() => setIsModalOpen(true)} className="Add">
            <AiOutlineUsergroupAdd />
            <span>Yeni Kişi</span>
          </button>
        </div>
      </header>
      {/*Main Kısmı: */}
      <main>
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            contact={contact}
            // title="Udemig Akademy"
            // number={237314}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </main>
      {/* Modal Kısmı: */}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setContacts={setContacts}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </div>
  );
}

export default App;
