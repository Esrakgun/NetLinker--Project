// React İcons alanı:
import { RiDeleteBinLine } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
// <------------------------------------------------------------>

// const Card = ({contact ,title ,number}) => {
const Card = ({ contact ,handleDelete ,handleEdit}) => {
  // console.log(contact);
  // console.log(contact.name);
  // console.log(contact.name.split(""));
  // Todo:Kişi isimlerinin ad ve soyadının ilk ve harflerini bölmek için bu veriyi split ile böldük.Sondasında bunları isim ve soyisim değerlerine aktardık.
  const [name, surname] = contact.name.split(" ");
  // console.log(typeof name);
  // console.log(name[0]);
  // console.log(surname[0]);
  // console.log(name);
  // console.log(surname);
  // console.log(props.contact);
  // <-----------------------------ARA------------------------->
  return (
    <div className="card">
      {/* Buttons:*/}
      <div className="buttons">
        {/* <button onClick={() => handleEdit(contact.id)}> */}
        <button onClick={() => handleEdit(contact)}>
          <RiEdit2Fill />
        </button>
        <button onClick={() => handleDelete(contact.id)}>
          <RiDeleteBinLine />
        </button>
      </div>
      {/* // <------------------------------------------------------*/}
      {/* Profil: */}
      {/* <h1>{name} {surname}</h1> */}
      <h1>
        {name[0]} {surname[0]}
      </h1>

      {/* <h1>{title}</h1> */}
      {/* Name: */}
      {/* <p>{props.contact.name}</p> */}
      <h3>{contact.name}</h3>
      {/* Position */}
      <p>{contact.position}</p>
      {/* Company */}
      <p>{contact.company}</p>

      {/* // <----------------------------------------------------->*/}
      {/* Buttons:*/}
      <div className="bottom">
        <div>
          <span>
            <BiSolidPhoneCall />
          </span>
          <span>{contact.phone}</span>
        </div>

        <div>
          <span>
            <MdEmail />
          </span>
          <span>{contact.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
