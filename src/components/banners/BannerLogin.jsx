import React from "react";
import imagen from "../../assets/img/Responsive-cuate.png";

const BannerLogin = () => {
  return (
    <div>
      <div className="divBanner">
        <h4 className="bannerLogin">
          Beneficios para suscriptores
          <span>
            <span>ACCESO ILIMITADO</span>
            <span>ÚLTIMOS BESTSELLERS</span>
            <span>DESCUENTOS EXCLUSIVOS</span>
            <span>ACCESO ILIMITADO</span>
          </span>
        </h4>
      </div>
      <img src={imagen} className="img-fluid" alt="Sample image" />
    </div>
  );
};

export default BannerLogin;
