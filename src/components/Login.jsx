import React, {useState} from 'react'
import imagen from '../assets/img/Responsive-cuate.png'

const Login = () => {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/loginCheck', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(email, password)
              });
    
          if (response.ok) {
            // El usuario ha iniciado sesión correctamente
            console.log('Usuario autenticado correctamente');
          } else {
            // El inicio de sesión falló
            console.error('Inicio de sesión fallido');
          }
        } catch (error) {
          console.error('Error al enviar solicitud de inicio de sesión:', error);
        }
      };

  return (
    
       <div className="container-fluid containerForm">
                <div className="row rowForm">
                    <div className="col-sm-9 col-md-7 col-lg-6 col-xl-5">
                        <div className="divBanner">
                        <h4 className="bannerLogin">
                            Beneficios para suscriptores
                            <span>
                                <span>ACCESO ILIMITADO</span><span>ÚLTIMOS BESTSELLERS</span>
                                <span>DESCUENTOS EXCLUSIVOS</span><span>ACCESO ILIMITADO</span>
                            </span>
                        </h4>
                    </div>
                        <img
                            src={imagen}
                            className="img-fluid"
                            alt="Sample image"
                            />
                    </div>
                    <div className="col-sm-9 col-md-8 col-lg-6 col-xl-5 col-xxl-4  offset-xl-1">

                        <form onSubmit={handleSubmit}
                            className="form"
                            id="formLogin"
                                                 >

        
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control form-control-lg"
                                    placeholder="Email"
                                    name="email"
                                    value = {email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                <label className="form-label" for="email">Email</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control form-control-lg"
                                    placeholder="Contraseña"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                <label className="form-label" for="password">Contraseña</label>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg btnSubmit"
                                    id="btnSubmit"
                                    >
                                    Iniciar Sesión
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

  )
}

export default Login
