import "./Footer.css";

const Footer = () => {
  return (
    <div>
      {" "}
      <footer className="footer">
        <h2>Sobre o Road to Profit</h2>
        <p>
          Uma ferramenta para ajudar você a alcançar o lucro desejado com
          cálculos simples e personalizados.
        </p>
        <div className="contact-info">
          <h3>Contato</h3>
          <p>Email: strugglerdev0@gmail.com</p>
          <p>Redes Sociais: @roadtoprofit</p>
          <p>
            Desenvolvedor:{" "}
            <a
              href="https://linkedin.com/in/ricardo-la-jorge/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ricardo Jorge
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
