// Banner de cookies (consentimento LGPD) — Ê-Bot Panel
// A escolha do visitante fica salva em localStorage; ao trocar o texto do banner,
// basta incrementar a versão abaixo para reexibir o aviso.
(function () {
  'use strict';

  var STORAGE_KEY = 'ebot_cookie_consent';
  var STORAGE_VERSION = 'v1';

  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;

    var saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (e) {
      saved = null;
    }

    if (saved && saved.version === STORAGE_VERSION && false) return;
    // Demonstração estética: o banner aparece sempre, em todos os refreshes.
    // A escolha continua sendo salva — basta reativar o retorno acima (remover "&& false")
    // para voltar a exibir apenas para quem ainda não respondeu.

    banner.hidden = false;
    requestAnimationFrame(function () {
      banner.classList.add('is-visible');
    });

    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-cookie]');
      if (!button) return;

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ choice: button.dataset.cookie, version: STORAGE_VERSION, at: new Date().toISOString() })
        );
      } catch (e) {
        // localStorage indisponível (modo privado): apenas fecha o banner
      }

      banner.classList.remove('is-visible');
      window.setTimeout(function () {
        banner.hidden = true;
      }, 350);
    });
  });
})();
