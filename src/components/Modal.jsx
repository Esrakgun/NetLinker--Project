//İmport Alanı:

import api from "../../api";
// import axios from "axios";
import Field from "./Filed";

// İcons İmport Alanı:
import { FaRegWindowClose } from "react-icons/fa";

// <-----------------------------ARA------------------------->
const Modal = ({ isModalOpen, setIsModalOpen, setContacts, editItem, setEditItem }) => {
  // console.log(editItem);

  // !Form Gönderildiğinde Çalışacak Fomksiyon:
  const handleSubmit = async (e) => {
    // Sayfa Yenilemesini engelle:
    e.preventDefault();
    // console.log(`Form Gönderildi..`);
    // console.log(FormData);
    // const name = (FormData.get("name"));
    // console.log(name);
    // !JS içerisinde bulunan FORMDATA yapısı sayesinde forma eriştik:
    const formData = new FormData(e.target);

    // !Erişilen bu form içerisindeki değerleri alıp önce entries methoduyla diziye sonrasında OBJECT.FromENTRİES ile objeye çevirdik.Bu sayede formun gönderilmesiyle bir kişi objesi elde ettik:
    // const name = FormData.entries();
    const newContact = Object.fromEntries(formData.entries());
    // console.log(newContact);
    // <---------------------------ARA------------------------->
    // !Kişi Eklemek:

    if (!editItem) {
      // const response = await axios.post("/contact", newContact);
      const response = await api.post("/contact", newContact);

      setContacts((contacts) => [...contacts, response.data]);
    } else {
      // Edit item kısmındaki verilerle kişiyi api'da güncelle/ gönder:
      const response = await api.put(`/contact/${editItem.id}`, newContact);
      // const response = await axios.put(`/contact/${editItem.id}`, newContact);
      // Güncellenen kişiyi contact state'i içerisinde de güncelle:
      setContacts((contacts) =>
        contacts.map((contact) =>
          contact.id === editItem.id ? response.data : contact
        )
      );
      // EditItem statei'ni nulla çek
      setEditItem(null);
    }
    // Modal'ı kapat
    setIsModalOpen(false);
  };
 
  //<---------------------------ARA------------------------->
  // !Kişi Düzenlemek:
  // console.log(`Düzenleme İşlemi`);
  //   axios.put(`/contact/${editItem.id}`, newContact);
  // !EditItem kısmındaki verilerle kişiyi API'da GÜNCELLEMEK:

  // axios.put(`/contact/${editItem.id}`, newContact).then(() => {
  //     setContacts((contacts) =>
  //         contacts.map((contact) =>
  //             contact.id === editItem.id ? newContact : contact)
  //             .then((err) => {
  //                 console.log(err);

  //             })
  //     );
  //      setEditItem(null);
  // });

  //<---------------------------ARA------------------------->
  // todo:Formdan alınan değerler ile API'a verileri göndermek için:
  //   axios.post("/contact", newContact);

  //todo:Spread operatörü ile yaptık:Öcekinde bulunan verileri kaybetmemk adına newcontact deseydık son veriler olcaktı ama biz setContact ,(bize aslında tüm degerleri alıp getırıyor),deyip hali hazırda güncellenen veriler ile oluşturcaz yani newContact ile ekrana bastırıp STATE' i güncellemiş oluyoruz.
  // Buradaki kişi verisini State'e aktarırısak bu bizim içim önceki verileri kaybetmemek anlamına gelecektir.Bunu engellemek için `SPREAD operatör` kullanılır yani ... ile yazım yapılır.Bu operatör önceki değerleri koruyup yeni değeride  state'e aktarır.
  //setContacts((contacts) => [...contacts, newContact]);
  //     axios
  //     .post("/contact", newContact)
  //     .then(() => {
  //     setContacts((contacts) => [...contacts, newContact]);
  //     })
  //     .catch((err) => {
  //      alert(`İşlem Gerçekleştirilemedi..`);
  //     console.log(`HATA: ${err}`);
  //     });

  //     //! Modal'ı kapatmak için:
  //     setIsModalOpen(() => false);
  // };
  //   console.log(editItem);

  // <-----------------------------ARA------------------------->
  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-inner">
          {/* Modal Head: */}
          <div className="modal-head">
            {/* <h2>Yeni Kişi Ekle</h2> */}
            {/* Edit Modundaysa Kişiyi Güncelle yoksa Yeni Kişi Ekle Yazsın: */}
            <h2>{editItem ? "Kişi Güncelle" : "Yeni Kişi Ekle"}</h2>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditItem(null);
              }}
            >
              <FaRegWindowClose />
            </button>
          </div>
          {/* <--------------------------ARA-------------------------> */}
          {/* Form: */}
          <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="Adı Soyadı:" name="name" />

            <Field
              value={editItem?.position}
              label="Pozisyonu:"
              name="position"
            />

            <Field value={editItem?.company} label="Şirket:" name="company" />

            <Field value={editItem?.phone} label="Telefon No:" name="phone" />

            <Field value={editItem?.email} label="Email Adresi:" name="email" />

            {/* <--------------------------ARA-------------------------> */}
            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditItem(null);
                }}
              >
                Vazgeç
              </button>
              <button type="submit">Gönder</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
export default Modal;
