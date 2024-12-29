import React, { useState, useEffect } from 'react';
import styles from '../CustomStyle.module.css';

function WeatherCard({ weatherData, error }) {
  const [cities, setCities] = useState([]); // Ekranda gösterilecek şehirler

  // LocalStorage'dan kaydedilen şehirleri almak
  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem('cities')) || []; // LocalStorage'dan şehirleri al
    setCities(storedCities); // State'i güncelle
  }, []);

  // Şehri localStorage'a kaydet ve listeyi güncelle
  const addCityToLocalStorage = (city) => {
    if (!cities.includes(city)) { // Eğer şehir daha önce eklenmediyse
      const updatedCities = [...cities, city];
      setCities(updatedCities); // Yeni şehir listesiyle state'i güncelle
      localStorage.setItem('cities', JSON.stringify(updatedCities)); // LocalStorage'ı güncelle
    }
  };

  // Şehir silme fonksiyonu
  const removeCityFromLocalStorage = (city) => {
    const updatedCities = cities.filter((c) => c !== city); // Silinecek şehri filtrele
    setCities(updatedCities); // State'i güncelle
    localStorage.setItem('cities', JSON.stringify(updatedCities)); // LocalStorage'ı güncelle
  };

  if (error) {
    return <p className="text-danger">{error}</p>; // Eğer hata varsa hata mesajını göster
  }

  if (!weatherData) {
    return null; // Hava durumu verisi yoksa hiç bir şey gösterme
  }

  // Hava durumu icon'una göre günün durumunu belirleyelim (d=gece, n=gündüz)
  const iconCode = weatherData.weather[0].icon;
  const isDay = iconCode.includes('d'); // Eğer icon 'd' ile başlıyorsa gündüz, 'n' ile başlıyorsa gece

  // Gündüz ve gece resimleri
  const dayImage = '/day_sun.png';
  const nightImage = '/night_day.png';

  // Şehir eklendiğinde bu fonksiyonu çağırıyoruz
  const handleAddCity = () => {
    addCityToLocalStorage(weatherData.name);
  };

  return (
    <div>
      <div className={`card rounded my-3 shadow-lg ${styles['back-card']}`}>
        <div className="card-top text-center">
          <div className={`my-3 text-center ${styles['city-name']}`}>
            <p className={`text-center ${styles['city-name-p']}`}>{weatherData.name}</p>
            <span className={`text-center ${styles['city-name-span']}`}>...</span>
          </div>
          <img
            src={isDay ? dayImage : nightImage} // Icon'a göre fotoğraf değişiyor
            alt="gece/gündüz fotoğrafı"
            className={`card-img-top time ${styles['icon-container-img']}`}
          />
        </div>

        <div className="card-body">
          <div className={`row text-center ${styles['card-mid']}`}>
            <div style={{ flex: 2 }} className={`text-center ${styles['temp-span']}`}>
              <span>{weatherData.main.temp}°C</span>
            </div>
            <div style={{ flex: 1 }} className="text-center">
              <p className={styles.condition}>{weatherData.weather[0].description}</p>
              <p className={styles.high}>{weatherData.main.temp_max}°C</p>
              <p className={styles.low}>{weatherData.main.temp_min}°C</p>
            </div>
          </div>

          <div className={`mx-auto ${styles['icon-container']}`}>
            <img className={styles['icon-container-img']} src="/cloud_1.png" alt="cloud icon" />
          </div>
          <div className={`px-3 py-2 row ${styles['card-bottom']}`}>
            <div className="col text-center">
              <p className={styles['card-bottom-p']}>{weatherData.main.feels_like}°C</p>
              <span className={styles['card-bottom-span']}>Hissesilen Sıcaklık</span>
            </div>
            <div className="col text-center">
              <p className={styles['card-bottom-p']}>{weatherData.main.humidity}%</p>
              <span className={styles['card-bottom-span']}>Nem</span>
            </div>
          </div>
        </div>

        {/* Şehri kaydet butonu */}
        <div className="text-center my-3">
          <button onClick={handleAddCity} className="btn btn-primary">Şehir Ekle</button>
        </div>
      </div>

      {/* Ekranın alt kısmına kaydedilen şehirleri yazdır */}
      <div className="my-3">
        <h5>Kaydedilen Şehirler:</h5>
        <ul>
          {cities.map((city, index) => (
            <li key={index} className="d-flex justify-content-between align-items-center">
              {city}
              <button
                onClick={() => removeCityFromLocalStorage(city)} // Silme işlemini başlatan buton
                className="btn btn-danger btn-sm"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WeatherCard;
