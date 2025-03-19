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
          <p>Email: contato@roadtoprofit.com</p>
          <p>Telefone: (11) 1234-5678</p>
          <p>Redes Sociais: @roadtoprofit</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
