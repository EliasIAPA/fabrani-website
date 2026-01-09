import { useEffect } from 'react';

export default function BrevoFormEmbed() {
  useEffect(() => {
    // Carregar o CSS do Brevo
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://sibforms.com/forms/end-form/build/sib-styles.css';
    document.head.appendChild(linkElement);

    return () => {
      // Cleanup: remover o link quando o componente for desmontado
      document.head.removeChild(linkElement);
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

        #sib-container a {
          text-decoration: underline;
          color: #2BB2FC;
        }
        
        /* Customização para tema dark */
        .sib-form {
          background-color: transparent !important;
        }
        
        #sib-container {
          background-color: rgba(20, 20, 20, 0.9) !important;
          border-color: rgba(0, 240, 255, 0.3) !important;
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
      `}</style>
      
      <div className="sib-form" style={{ textAlign: 'center', backgroundColor: 'transparent' }}>
        <div id="sib-form-container" className="sib-form-container">
          <div 
            id="sib-container" 
            className="sib-container--large sib-container--vertical" 
            style={{ 
              textAlign: 'center', 
              backgroundColor: 'rgba(20, 20, 20, 0.9)', 
              maxWidth: '540px', 
              borderRadius: '12px', 
              borderWidth: '1px', 
              borderColor: 'rgba(0, 240, 255, 0.3)', 
              borderStyle: 'solid',
              margin: '0 auto',
              padding: '24px'
            }}
          >
            <form 
              id="sib-form" 
              method="POST" 
              action="https://18a0dd9e.sibforms.com/serve/MUIFACBW_dgbNDoGOU-vfvkfZOYVg_6wpg1-KIdwke0UEQ17HZNJ5AGGtNPxb0rlXyyIdkjkol5JznmWGQK32fWvemsLXbY3Mp4bKzFog61pn89WaFzmBsMkq5ulLqRSTTrkG1OyTfKbe82ngnc7t_FWz1m4qXNHQCgfnJ2FQp4fZpoqey4xtuQp0NI3RkabW3T9yLRbasyRj01E"
            >
              <div style={{ padding: '8px 0' }}>
                <div className="sib-form-block" style={{ fontSize: '24px', textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica, sans-serif', color: '#ffffff', backgroundColor: 'transparent' }}>
                  <p>Baixe o Guia de Prompts 2026</p>
                </div>
              </div>
              
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
                        Insira seu e-mail
                      </label>
                      <div className="entry__field">
                        <input 
                          className="input" 
                          type="email" 
                          id="EMAIL" 
                          name="EMAIL" 
                          autoComplete="off" 
                          placeholder="seu@email.com" 
                          data-required="true" 
                          required 
                        />
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary" style={{ fontSize: '14px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949' }}></label>
                    <label className="entry__specification" style={{ fontSize: '12px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#9ca3af' }}>
                      Forneça seu e-mail. Ex: abc@xyz.com
                    </label>
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '8px 0' }}>
                <div className="sib-sms-field sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <label 
                        className="entry__label" 
                        style={{ fontWeight: 700, textAlign: 'left', fontSize: '14px', fontFamily: 'Helvetica, sans-serif', color: '#ffffff' }} 
                        htmlFor="SMS" 
                        data-required="*"
                      >
                        Insira seu WhatsApp
                      </label>
                      <div className="sib-sms-input-wrapper" style={{ direction: 'ltr' }}>
                        <div className="sib-sms-input" data-placeholder="whatsapp" data-required="1" data-country-code="BR" data-whatsapp-country-code="BR" data-value="" data-whatsappvalue="" data-attributename="SMS">
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
                            O campo SMS deve conter entre 6 e 19 dígitos e incluir o código do país sem usar +/0
                          </div>
                          <span className="sib-sms-tooltip__icon">?</span>
                        </div>
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary" style={{ fontSize: '14px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949' }}></label>
                    <label className="entry__error entry__error--secondary" style={{ fontSize: '14px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949' }}></label>
                    <label className="entry__specification" style={{ fontSize: '12px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#9ca3af' }}>
                      Insira seu número de WhatsApp com DDD
                    </label>
                  </div>
                </div>
              </div>
              
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
              
              <input type="text" name="email_address_check" value="" className="input--hidden" style={{ display: 'none' }} />
              <input type="hidden" name="locale" value="pt" />
              <input type="hidden" name="html_type" value="simple" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
