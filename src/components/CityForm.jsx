import React from 'react';
import styles from '../CustomStyle.module.css'


function CityForm({ city, setCity, handleSubmit }) {
  const handleInputChange = (e) => {
    setCity(e.target.value); // Kullanıcının girdiği şehir adını setCity ile güncelleriz.
  };

  return (
    <form className="search-location" onSubmit={handleSubmit}>
      <input
        type="text"
        name="city"
        placeholder="Şehir Giriniz."
        className={`form-control text-center text-muted p-4 shadow-sm ${styles['form-rounded']}`}
        value={city} // Şehir adı state ile kontrol edilir
        onChange={handleInputChange} // Şehir adı her değiştiğinde güncellenir
      />
      <button type="submit" className="btn btn-primary mt-3">Hava Durumunu Getir</button>
    </form>
  );
}

export default CityForm;