import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomeView() {


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferences: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, preferences } = formData;

    if (!name || !email || !preferences) {
      setError('Veuillez remplir tous les champs.');
    } else if (!validateEmail(email)) {
      setError('Entrer une adresse email valide.');
    } else if (!validatePreferences(preferences)) {
      setError('La preference doit contenir des lettres.');
    } else {
      setError('');
      alert('Merci pour votre souscription');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePreferences = (preferences) => {
    const re = /^[A-Za-z]+$/;
    return re.test(String(preferences));
  };


  return (
    <motion.div id="home">
      <motion.div className="banner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.h1>Bienvenue sur Daily News</motion.h1>
        <motion.p>
          votre source ultime pour les dernières actualités, les prévisions météorologiques détaillées et les informations financières en temps réel. Notre mission est de vous tenir informé et à jour sur tout ce qui se passe dans le monde.
        </motion.p>
      </motion.div>
      <motion.div className="cards">
        <motion.div className="card">
          <motion.h1><span style={{fontSize:"2em"}} className="material-symbols-outlined">
            newspaper
          </span>Actualités</motion.h1>
          <motion.p>

            Restez connecté avec les nouvelles locales et internationales. Nous couvrons un large éventail de sujets, y compris la politique, l'économie, la technologie, la culture et bien plus encore. Nos articles sont sélectionnés avec soin pour vous apporter une perspective complète et équilibrée.
          </motion.p>
        </motion.div>
        <motion.div className="card">
          <motion.h1><span style={{fontSize:"2em"}} className="material-symbols-outlined">
            partly_cloudy_day
          </span>Météo</motion.h1>
          <motion.p>
            Consultez les prévisions météorologiques pour votre ville et pour les grandes métropoles du monde entier. Que vous planifiiez votre journée ou prépariez un voyage, nos mises à jour météorologiques précises et en temps réel vous aideront à rester informé des conditions climatiques.
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div className="form">
        <h2>Souscrire a la Newsletter</h2>
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error">{error}</motion.p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Preferences:</label>
            <input type="text" name="preferences" value={formData.preferences} onChange={handleChange} />
          </div>
          <div className="form-group">
            <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>S'inscrire</motion.button>

          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
