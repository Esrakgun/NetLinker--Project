

const Field =({label,name ,value})=>{
    return(
        <div className="field">
            <label htmlFor="">{label}</label>
            <input type="text"  name={name} defaultValue={value}/>
            {/* <input type="text"  name={name} value={value}/> */}
            {/* !!!Default value demeden önce güncellenecek değer için modal açıldığında inputlara sil işlemi gerçekleşmiyordu defaul haline gelince artık input içindeki değer silincek hale geldi:!ÖNEMLİ! */}
        </div>
    );
};

export default Field;