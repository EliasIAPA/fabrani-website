import { useEffect } from 'react';

export default function BrevoFormEmbed() {
  useEffect(() => {
    // Carregar o CSS do Brevo
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://sibforms.com/forms/end-form/build/sib-styles.css';
    document.head.appendChild(linkElement);

    // Carregar o script do Brevo
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://sibforms.com/forms/end-form/build/main.js';
    scriptElement.defer = true;
    document.body.appendChild(scriptElement);

    // Configurar variáveis globais do Brevo
    (window as any).REQUIRED_CODE_ERROR_MESSAGE = 'Escolha um código de país';
    (window as any).LOCALE = 'pt';
    (window as any).EMAIL_INVALID_MESSAGE = (window as any).SMS_INVALID_MESSAGE = "A informação fornecida não é válida. Verifique o formato do campo e tente novamente.";
    (window as any).REQUIRED_ERROR_MESSAGE = "Este campo não pode ser deixado em branco.";
    (window as any).GENERIC_INVALID_MESSAGE = "A informação fornecida não é válida. Verifique o formato do campo e tente novamente.";
    (window as any).translation = {
      common: {
        selectedList: '{quantity} lista selecionada',
        selectedLists: '{quantity} listas selecionadas',
        selectedOption: '{quantity} selecionado',
        selectedOptions: '{quantity} selecionados',
      }
    };
    (window as any).AUTOHIDE = false;

    return () => {
      // Cleanup
      document.head.removeChild(linkElement);
      if (document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @font-face {
          font-display: block;
          font-family: Roboto;
          src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff")
        }

        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 600;
          src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff")
        }

        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 700;
          src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff")
        }

        #sib-container input:-ms-input-placeholder {
          text-align: left;
          font-family: Helvetica, sans-serif;
          color: #c0ccda;
        }

        #sib-container input::placeholder {
          text-align: left;
          font-family: Helvetica, sans-serif;
          color: #c0ccda;
        }

        #sib-container textarea::placeholder {
          text-align: left;
          font-family: Helvetica, sans-serif;
          color: #c0ccda;
        }

        #sib-container a {
          text-decoration: underline;
          color: #2BB2FC;
        }
        
        /* Customização para tema dark */
        .sib-form {
          background-color: transparent !important;
        }
        
        #sib-container {
          background-color: rgba(20, 20, 20, 0.95) !important;
          border-color: rgba(0, 240, 255, 0.3) !important;
          border-radius: 12px !important;
        }
        
        #sib-container .sib-form-block p,
        #sib-container .entry__label {
          color: #ffffff !important;
        }
        
        #sib-container .entry__specification {
          color: #9ca3af !important;
        }
        
        #sib-container .input {
          background-color: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          color: #ffffff !important;
        }
        
        #sib-container .input:focus {
          border-color: rgba(0, 240, 255, 0.5) !important;
          outline: none !important;
        }
        
        #sib-container .sib-form-block__button {
          background-color: #00f0ff !important;
          color: #000000 !important;
          font-weight: 700 !important;
          transition: all 0.3s ease !important;
          width: 100% !important;
          padding: 14px 32px !important;
          border-radius: 6px !important;
        }
        
        #sib-container .sib-form-block__button:hover {
          background-color: #00d4e0 !important;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.5) !important;
        }
        
        #sib-container select.input {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
        }
        
        #sib-container select.input option {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
        }
        
        .sib-sms-tooltip__box {
          background-color: #1a1a1a !important;
          color: #9ca3af !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }

        /* Mensagens de erro e sucesso */
        #error-message {
          display: none;
        }
        
        #success-message {
          display: none;
        }
        
        #success-message.sib-form-message-panel--active {
          display: block !important;
          background-color: rgba(16, 185, 129, 0.2) !important;
          border-color: #10b981 !important;
          color: #10b981 !important;
          margin: 0 auto 16px !important;
        }
        
        #success-message .sib-form-message-panel__inner-text {
          color: #10b981 !important;
        }
        
        #error-message.sib-form-message-panel--active {
          display: block !important;
          background-color: rgba(239, 68, 68, 0.2) !important;
          border-color: #ef4444 !important;
          color: #ef4444 !important;
          margin: 0 auto 16px !important;
        }
      `}</style>
      
      <div className="sib-form" style={{ textAlign: 'center', backgroundColor: 'transparent' }}>
        <div id="sib-form-container" className="sib-form-container">
          {/* Mensagem de Erro */}
          <div id="error-message" className="sib-form-message-panel" style={{ fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949', maxWidth: '540px' }}>
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                Sua assinatura não pôde ser validada.
              </span>
            </div>
          </div>
          
          {/* Mensagem de Sucesso */}
          <div id="success-message" className="sib-form-message-panel" style={{ fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#085229', backgroundColor: '#e7faf0', borderRadius: '3px', borderColor: '#13ce66', maxWidth: '540px' }}>
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                Bem vindo a FABRANI! Você se cadastrou com sucesso. Acesse seu e-mail agora enviado por contato@fabrani.com.br
              </span>
            </div>
          </div>
          
          {/* Container do Formulário */}
          <div 
            id="sib-container" 
            className="sib-container--large sib-container--vertical" 
            style={{ 
              textAlign: 'center', 
              backgroundColor: 'rgba(20, 20, 20, 0.95)', 
              maxWidth: '540px', 
              borderRadius: '12px', 
              borderWidth: '1px', 
              borderColor: 'rgba(0, 240, 255, 0.3)', 
              borderStyle: 'solid',
              direction: 'ltr',
              margin: '0 auto',
              padding: '24px'
            }}
          >
            <form 
              id="sib-form" 
              method="POST" 
              action="https://18a0dd9e.sibforms.com/serve/MUIFACBW_dgbNDoGOU-vfvkfZOYVg_6wpg1-KIdwke0UEQ17HZNJ5AGGtNPxb0rlXyyIdkjkol5JznmWGQK32fWvemsLXbY3Mp4bKzFog61pn89WaFzmBsMkq5ulLqRSTTrkG1OyTfKbe82ngnc7t_FWz1m4qXNHQCgfnJ2FQp4fZpoqey4xtuQp0NI3RkabW3T9yLRbasyRj01E"
              data-type="subscription"
            >
              {/* Título */}
              <div style={{ padding: '8px 0' }}>
                <div className="sib-form-block" style={{ fontSize: '24px', textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica, sans-serif', color: '#ffffff', backgroundColor: 'transparent' }}>
                  <p>Baixe o Guia de Prompts 2026</p>
                </div>
              </div>
              
              {/* Campo NOME */}
              <div style={{ padding: '8px 0' }}>
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <label 
                        className="entry__label" 
                        style={{ fontWeight: 700, textAlign: 'left', fontSize: '14px', fontFamily: 'Helvetica, sans-serif', color: '#ffffff' }} 
                        htmlFor="NOME" 
                        data-required="*"
                      >
                        Insira seu NOME
                      </label>
                      <div className="entry__field">
                        <input 
                          className="input" 
                          maxLength={200}
                          type="text" 
                          id="NOME" 
                          name="NOME" 
                          autoComplete="off" 
                          placeholder="Seu nome completo" 
                          data-required="true" 
                          required 
                        />
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary" style={{ fontSize: '14px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949' }}></label>
                  </div>
                </div>
              </div>
              
              {/* Campo EMAIL */}
              <div style={{ padding: '8px 0' }}>
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <label 
                        className="entry__label" 
                        style={{ fontWeight: 700, textAlign: 'left', fontSize: '14px', fontFamily: 'Helvetica, sans-serif', color: '#ffffff' }} 
                        htmlFor="EMAIL" 
                        data-required="*"
                      >
                        Insira seu melhor e-mail
                      </label>
                      <div className="entry__field">
                        <input 
                          className="input" 
                          type="email" 
                          id="EMAIL" 
                          name="EMAIL" 
                          autoComplete="off" 
                          placeholder="joao@gmail.com" 
                          data-required="true" 
                          required 
                        />
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary" style={{ fontSize: '14px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949' }}></label>
                    <label className="entry__specification" style={{ fontSize: '12px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#9ca3af' }}>
                      Por exemplo: joao@gmail.com
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Campo WHATSAPP */}
              <div style={{ padding: '8px 0' }}>
                <div className="sib-sms-field sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <label 
                        className="entry__label" 
                        style={{ fontWeight: 700, textAlign: 'left', fontSize: '14px', fontFamily: 'Helvetica, sans-serif', color: '#ffffff' }} 
                        htmlFor="WHATSAPP" 
                        data-required="*"
                      >
                        Insira seu WHATSAPP
                      </label>
                      <div className="sib-sms-input-wrapper" style={{ direction: 'ltr' }}>
                        <div className="sib-sms-input" data-placeholder="WHATSAPP" data-required="1" data-country-code="BR" data-whatsapp-country-code="BR" data-value="" data-whatsappvalue="" data-attributename="WHATSAPP">
                          <div className="entry__field" style={{ display: 'flex', gap: '8px' }}>
                            <select 
                              className="input" 
                              name="SMS__COUNTRY_CODE" 
                              data-required="true"
                              defaultValue="+55"
                              style={{ width: '120px', flexShrink: 0 }}
                            >
                              <option value="+55">+55 BR</option>
                              <option value="+1">+1 US</option>
                              <option value="+351">+351 PT</option>
                              <option value="+34">+34 ES</option>
                              <option value="+44">+44 GB</option>
                              <option value="+49">+49 DE</option>
                              <option value="+33">+33 FR</option>
                              <option value="+39">+39 IT</option>
                              <option value="+81">+81 JP</option>
                              <option value="+86">+86 CN</option>
                              <option value="+54">+54 AR</option>
                              <option value="+56">+56 CL</option>
                              <option value="+57">+57 CO</option>
                              <option value="+52">+52 MX</option>
                              <option value="+598">+598 UY</option>
                              <option value="+595">+595 PY</option>
                            </select>
                          </div>
                          <div className="entry__field" style={{ width: '100%', marginTop: '8px' }}>
                            <input 
                              type="tel" 
                              className="input" 
                              id="SMS" 
                              name="SMS" 
                              autoComplete="off" 
                              placeholder="(11) 99999-9999" 
                              data-required="true" 
                              required 
                            />
                          </div>
                        </div>
                        <div className="sib-sms-tooltip">
                          <div className="sib-sms-tooltip__box">
                            O campo WHATSAPP deve conter entre 6 e 19 dígitos e incluir o código do país sem usar +/0
                          </div>
                          <span className="sib-sms-tooltip__icon">?</span>
                        </div>
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary" style={{ fontSize: '14px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949' }}></label>
                    <label className="entry__error entry__error--secondary" style={{ fontSize: '14px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949' }}></label>
                    <label className="entry__specification" style={{ fontSize: '12px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#9ca3af' }}>
                      Por exemplo: +5511992705789
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Botão de Envio */}
              <div style={{ padding: '16px 0 8px' }}>
                <div className="sib-form-block" style={{ textAlign: 'center' }}>
                  <button 
                    className="sib-form-block__button sib-form-block__button-with-loader" 
                    style={{ 
                      fontSize: '16px', 
                      textAlign: 'center', 
                      fontWeight: 700, 
                      fontFamily: 'Helvetica, sans-serif', 
                      color: '#000000', 
                      backgroundColor: '#00f0ff', 
                      borderRadius: '6px', 
                      borderWidth: '0px',
                      padding: '14px 32px',
                      cursor: 'pointer',
                      width: '100%'
                    }} 
                    form="sib-form" 
                    type="submit"
                  >
                    <svg className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512" style={{ display: 'none' }}>
                      <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                    </svg>
                    BAIXAR GUIA AGORA
                  </button>
                </div>
              </div>
              
              <input type="text" name="email_address_check" defaultValue="" className="input--hidden" style={{ display: 'none' }} />
              <input type="hidden" name="locale" value="pt" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
